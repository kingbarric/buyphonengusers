import { CrudService } from './../../../services/crud.service';
import { Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DirectionService } from '../../../shared/services/direction.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    ColorFilter,
    ColorFilterItem,
    Filter,
    SerializedFilterValues,
    CheckFilter,
    FilterItem, RadioFilter
} from '../../../shared/interfaces/filter';
import { RootService } from '../../../shared/services/root.service';
import { Subject, Observable, of } from 'rxjs';
import { PageCategoryService } from '../../shop/services/page-category.service';
import { map, takeUntil } from 'rxjs/operators';

interface FormFilterValues {
    [filterSlug: string]: [number, number] | { [itemSlug: string]: boolean } | string;
}
interface filter {
    lowest: number,
    highest: number, touched?: boolean
}

@Component({
    selector: 'app-widget-filters',
    templateUrl: './widget-filters.component.html',
    styleUrls: ['./widget-filters.component.scss']
})
export class WidgetFiltersComponent implements OnInit, OnDestroy {
    @Input() offcanvas: 'always' | 'mobile' = 'mobile';

    destroy$: Subject<void> = new Subject<void>();
    range
    filters: any[] = [
        {
            name: "Categories",
            root: true,
            slug: "categories",
            type: "categories",
            items: []
        },
        {
            max: 5000000,
            min: 0,
            name: "Price",
            slug: "price",
            type: "range",
            value: [0, 5000000]
        },
        {
            name: "Brand",
            slug: "brand",
            type: "check",
            items: [],
            value: []
        },

    ]

    filtersForm: FormGroup;
    isPlatformBrowser = isPlatformBrowser(this.platformId);
    rightToLeft = false;
    filterObj: filter
    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private direction: DirectionService,
        private fb: FormBuilder,
        public root: RootService,
        public pageCategory: PageCategoryService,
        private crud: CrudService
    ) {
        this.rightToLeft = this.direction.isRTL();
        this.getFilterPrice();
    }

    ngOnInit(): void {
        this.getCat()
        // this.prepareFilter()
        this.getBrands();

    }

    getFilterPrice() {
        this.pageCategory.filterObs.subscribe((value: filter) => this.filterObj = value)
    }

    prepareFilter() {
        this.pageCategory.list$.pipe(
            map(x => x.filters),
            takeUntil(this.destroy$),
        ).subscribe(filters => {
            console.log(filters);
            this.filters = filters;
            this.filtersForm = this.makeFiltersForm(filters);
        });
    }

    getCat() {
        this.crud.getRequestNoAuth('exp/categorywithproductcount').then((res: any) => {
            this.filters.forEach((filter) => {
                if (filter.slug == 'categories') {
                    filter.items = this.makeCatObj(res)
                }
            })
            this.filtersForm = this.makeFiltersForm(this.filters);
        }).catch((err: any) => {
            console.log(err);
        })
    }

    makeCatObj(cats: any[]) {
        let category: any[] = cats.map((cat) => {
            return {
                count: cat.count,
                name: cat.categoryName,
                slug: cat.categoryId,
                type: "child"
            }
        })
        return category
    }

    getBrands() {
        this.crud.getRequestNoAuth('exp/brandwithproductcount').then((res: any) => {
            console.log(res);
            this.filters.forEach((filter) => {
                if (filter.slug == 'brand') {
                    filter.items = this.makeBrandObj(res)
                }
            })
            this.filtersForm = this.makeFiltersForm(this.filters);
        }).catch((err: any) => {
            console.log(err);
        })
    }

    makeBrandObj(brands: any[]) {
        let allBrands = brands.map((brand) => {
            return {
                count: brand.count,
                name: brand.name,
                slug: brand.id
            }
        })
        return allBrands
    }

    priceChange(_) {
        this.filterObj.touched = true
        this.pageCategory.setFilterValue(this.filterObj)
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    trackBySlug(index: number, item: { slug: string }): any {
        return item.slug;
    }

    makeFiltersForm(filters: Filter[]): FormGroup {
        const filtersFromGroup = {};

        filters.forEach(filter => {
            switch (filter.type) {
                case 'range':
                case 'radio':
                    filtersFromGroup[filter.slug] = this.fb.control(filter.value);
                    break;
                case 'check':
                case 'color':
                    filtersFromGroup[filter.slug] = this.makeListFilterForm(filter);
                    break;
            }
        });

        return this.fb.group(filtersFromGroup);
    }

    makeListFilterForm(filter: CheckFilter | ColorFilter): FormGroup {
        const group = {};

        filter.items.forEach(item => {
            const control = this.fb.control(filter.value.includes(item.slug));

            // A timeout is needed because sometimes a state change is ignored if performed immediately.
            setTimeout(() => {
                if (this.isItemDisabled(filter, item)) {
                    control.disable({ emitEvent: false });
                } else {
                    control.enable({ emitEvent: false });
                }
            }, 0);

            group[item.slug] = control;
        });

        return this.fb.group(group);
    }

    isItemDisabled(filter: CheckFilter | RadioFilter | ColorFilter, item: FilterItem | ColorFilterItem): boolean {
        return item.count === 0 && (filter.type === 'radio' || !filter.value.includes(item.slug));
    }

    convertFormToFilterValues(filters: Filter[], formValues: FormFilterValues): SerializedFilterValues {
        const filterValues: SerializedFilterValues = {};

        filters.forEach(filter => {
            const formValue = formValues[filter.slug];

            switch (filter.type) {
                case 'range':
                    if (formValue && (formValue[0] !== filter.min || formValue[1] !== filter.max)) {
                        filterValues[filter.slug] = `${formValue[0]}-${formValue[1]}`;
                    }
                    break;
                case 'check':
                case 'color':
                    const filterFormValues = formValue as object || {};

                    // Reactive forms do not add a values of disabled checkboxes.
                    // This code will add them manually.
                    filter.value.forEach(filterValue => {
                        if (!(filterValue in filterFormValues)) {
                            filterFormValues[filterValue] = true;
                        }
                    });

                    const values = Object.keys(filterFormValues).filter(x => filterFormValues[x]);

                    if (values.length > 0) {
                        filterValues[filter.slug] = values.join(',');
                    }
                    break;
                case 'radio':
                    if (formValue !== filter.items[0].slug) {
                        filterValues[filter.slug] = formValue as string;
                    }

                    break;
            }
        });

        return filterValues;
    }

    reset(): void {
        const formValues = {};

        this.filters.forEach(filter => {
            switch (filter.type) {
                case 'range':
                    formValues[filter.slug] = [filter.min, filter.max];
                    break;
                case 'check':
                case 'color':
                    formValues[filter.slug] = {};

                    filter.items.forEach(item => {
                        formValues[filter.slug][item.slug] = false;
                    });
                    break;
                case 'radio':
                    formValues[filter.slug] = filter.items[0].slug;
                    break;
            }
        });

        this.filtersForm.setValue(formValues);
    }
}
