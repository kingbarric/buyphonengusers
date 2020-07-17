import { ActivatedRoute } from '@angular/router';
import { CrudService } from './../../../../services/crud.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ShopSidebarService } from '../../services/shop-sidebar.service';
import { PageCategoryService } from '../../services/page-category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

export type Layout = 'grid' | 'grid-with-features' | 'list';

@Component({
    selector: 'app-products-view',
    templateUrl: './products-view.component.html',
    styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit, OnDestroy {
    @Input() layout: Layout = 'grid';
    @Input() grid: 'grid-3-sidebar' | 'grid-4-full' | 'grid-5-full' = 'grid-3-sidebar';
    @Input() offcanvas: 'always' | 'mobile' = 'mobile';

    destroy$: Subject<void> = new Subject<void>();

    listOptionsForm: FormGroup;
    filtersCount = 0;
    products: any[] = [];
    limit:number = 20;
    page:number = 0;
    constructor(
        private fb: FormBuilder,
        public sidebar: ShopSidebarService,
        public pageService: PageCategoryService,
        private crud: CrudService,
        private route: ActivatedRoute
    ) {
        this.route.queryParams.subscribe((params) => {
            console.log(params);
            if (params.category) {
                this.getProductByCatId(params.category)
                return
            } if (params.brand) {
                this.getProductByBrandId(params.brand)
                return
            }
            this.getProducts()
        })
    }

    ngOnInit(): void {
        this.listOptionsForm = this.fb.group({
            page: this.fb.control(this.pageService.page),
            limit: this.fb.control(this.pageService.limit),
            sort: this.fb.control(this.pageService.sort),
        });
        this.listOptionsForm.valueChanges.subscribe(value => {
            console.log(value);

            value.limit = parseFloat(value.limit);

            this.pageService.updateOptions(value);
        });

        this.pageService.list$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(
            ({ page, limit, sort, filterValues }) => {
                this.filtersCount = Object.keys(filterValues).length;
                this.listOptionsForm.setValue({ page, limit, sort }, { emitEvent: false });
            }
        );

        this.pageService.filterObs.pipe(
            distinctUntilChanged((prev, curr) => prev != curr), debounceTime(500)).subscribe((filterObj) => {
            if (filterObj.touched) {
                this.getProductbetweenRange(filterObj.highest, filterObj.lowest)
            }
            })
    }

    checker(e){
        console.log(e);
    }

    getProductbetweenRange(highest, lowest) {
        this.pageService.setIsLoading(true)
        this.crud.getRequestNoAuth(`exp/searchpricebetween/${lowest}/${highest}/${this.page}/${this.limit}`).then((res: any) => {
            console.log(res.content);
            this.products = res.content
        }).catch((err: any) => {
            console.log(err);
        }).finally(() => this.pageService.setIsLoading(false))
    }

    getProducts() {
        this.pageService.setIsLoading(true)
        this.crud.getRequestNoAuth(`exp/featuredproduct/${this.page}/${this.limit}`).then((res: any) => {
            console.log(res.content);
            this.products = res.content
        }).catch((err: any) => {
            console.log(err);
        }).finally(() => this.pageService.setIsLoading(false))
    }

    getProductByBrandId(brandId) {
        this.pageService.setIsLoading(true)
        this.crud.getRequestNoAuth(`exp/productbybrandid/${brandId}/${this.page}/${this.limit}`).then((res: any) => {
            console.log(res.content);
            this.products = res.content
        }).catch((err: any) => {
            console.log(err);
        }).finally(() => this.pageService.setIsLoading(false))
    }

    getProductByCatId(catId) {
        this.pageService.setIsLoading(true)
        this.crud.getRequestNoAuth(`exp/productbycategoryid/${catId}/${this.page}/${this.limit}`).then((res: any) => {
            console.log(res.content);
            this.products = res.content
        }).catch((err: any) => {
            console.log(err);
        }).finally(() => this.pageService.setIsLoading(false))
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    setLayout(value: Layout): void {
        this.layout = value;
    }

    resetFilters(): void {
        this.pageService.updateOptions({ filterValues: {} });
    }
}
