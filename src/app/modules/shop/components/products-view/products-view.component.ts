import { Router } from '@angular/router';
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
loadingProduct:boolean = false
    listOptionsForm: FormGroup;
    filtersCount = 0;
    products: any[] = [];
    limit: number = 20;
    page: number = 0;
    totalPages: number = 0;
    queryType: 'all' | 'brand' | 'category' | 'price' = 'all'
    filterObj: any = null
    brandId: string = null;
    categoryId: string = null;
    emptyProducts:any[]=new Array(20).fill(null)
    constructor(
        private fb: FormBuilder,
        public sidebar: ShopSidebarService,
        public pageService: PageCategoryService,
        private crud: CrudService,
        private route: ActivatedRoute,
        private router: Router
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
                    this.filterObj = filterObj
                    this.getProductbetweenRange(filterObj.highest, filterObj.lowest)
                }
            })
    }

    pageEvent(page) {
        this.page = parseInt(page) - 1;
        if (this.queryType == 'all') {
            this.getProducts()
            return
        }
        if (this.queryType == 'brand' && this.brandId) {
            this.getProductByBrandId(this.brandId)
            return
        }
        if (this.queryType == 'category' && this.categoryId) {
            this.getProductByCatId(this.categoryId)
            return
        }
        if (this.queryType == 'price' && this.filterObj) {
            this.getProductbetweenRange(this.filterObj.highest, this.filterObj.lowest)
            return
        }
        this.getProducts()
    }

    getProductbetweenRange(highest, lowest) {
        
        if (this.queryType != 'price') {
            this.page = 0;
            this.queryType = 'price'
        }
        this.pageService.setIsLoading(true)
        this.loadingProduct =true
        this.crud.getRequestNoAuth(`exp/searchpricebetween/${lowest}/${highest}/${this.page}/${this.limit}`).then((res: any) => {
            console.log(res);
            this.products = res.content
            this.totalPages = res.totalPages
        }).catch((err: any) => {
            console.log(err);
        }).finally(() => {     
            this.loadingProduct =false;
               window.scroll(0, 0);this.pageService.setIsLoading(false)})
    }

    getProducts() {
        this.loadingProduct =true
        if (this.queryType != 'all') {
            this.page = 0;
            this.queryType = 'all'
        }
        this.pageService.setIsLoading(true)
        this.crud.getRequestNoAuth(`exp/findallactiveproduct/${this.page}/${this.limit}`).then((res: any) => {
            console.log(res);
            this.products = res.content;
            this.totalPages = res.totalPages
        }).catch((err: any) => {
            console.log(err);
        }).finally(() => {      this.loadingProduct =false ;  window.scroll(0, 0);this.pageService.setIsLoading(false)})
    }

    getProductByBrandId(brandId) {
        if (this.queryType != 'brand') {
            this.page = 0;
            this.queryType = 'brand'
        }
        this.brandId = brandId
        this.pageService.setIsLoading(true)
        this.loadingProduct =true
        this.crud.getRequestNoAuth(`exp/productbybrandid/${brandId}/${this.page}/${this.limit}`).then((res: any) => {
            console.log(res);
            this.products = res.content
            this.totalPages = res.totalPages
        }).catch((err: any) => {
            console.log(err);
        }).finally(() => {       this.loadingProduct =false;  window.scroll(0, 0);this.pageService.setIsLoading(false)})
    }

    getProductByCatId(catId) {
        if (this.queryType != 'category') {
            this.page = 0;
            this.queryType = 'category'
        }
        this.categoryId = catId
        this.pageService.setIsLoading(true)
        this.loadingProduct =true
        this.crud.getRequestNoAuth(`exp/productbycategoryid/${catId}/${this.page}/${this.limit}`).then((res: any) => {
            console.log(res);
            this.products = res.content;
            this.totalPages = res.totalPages
        }).catch((err: any) => {
            console.log(err);
        }).finally(() => {    this.loadingProduct =false;     window.scroll(0, 0);this.pageService.setIsLoading(false)})
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    setLayout(value: Layout): void {
        this.layout = value;
    }

    resetFilters(): void {
        this.router.navigate(["shop/catalog"])
    }
}
