import { products } from './../../../fake-server/database/products';
import { CrudService } from './../../services/crud.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { posts } from '../../../data/blog-posts';
import { Brand } from '../../shared/interfaces/brand';
import { Observable, Subject, merge, BehaviorSubject, of } from 'rxjs';
import { ShopService } from '../../shared/api/shop.service';
import { Product } from '../../shared/interfaces/product';
import { Category } from '../../shared/interfaces/category';
import { BlockHeaderGroup } from '../../shared/interfaces/block-header-group';
import { takeUntil, tap } from 'rxjs/operators';

interface ProductsCarouselGroup extends BlockHeaderGroup {
    products$: Observable<any[]>;
}

interface ProductsCarouselData {
    abort$: Subject<void>;
    loading: boolean;
    products: any[];
    groups: any[];
}

@Component({
    selector: 'app-home',
    templateUrl: './page-home-one.component.html',
    styleUrls: ['./page-home-one.component.scss']
})
export class PageHomeOneComponent implements OnInit, OnDestroy {
    destroy$: Subject<void> = new Subject<void>();
    bestsellers$: Observable<any[]>;
    brands$: Observable<any[]>;
    popularCategories$: Observable<any[]>;

    columnTopRated$: Observable<any[]>;
    columnSpecialOffers$: Observable<any[]>;
    columnBestsellers$: Observable<any[]>;

    posts = posts;

    featuredProducts: ProductsCarouselData;
    latestProducts: ProductsCarouselData;

    constructor(
        private shop: ShopService,
        private crud: CrudService
    ) {
        this.getFeaturedProduct();
        this.getBestsellers();
        this.getLastestProduct()
        this.getColumnBestSellers()
        this.getColumnSpecialOffers()
        this.getColumnTopRated()
        this.getCategories();
        this.getTopBrands();
    }

    ngOnInit(): void {
        this.bestsellers$ = of([]);
        this.brands$ = of([]);
        this.popularCategories$ = of([]);
        this.columnTopRated$ = of([]);
        this.columnSpecialOffers$ = of([])
        this.columnBestsellers$ = of([]);

        this.featuredProducts = {
            abort$: new Subject<void>(),
            loading: true,
            products: [],
            groups: [],
        };

        this.latestProducts = {
            abort$: new Subject<void>(),
            loading: true,
            products: [],
            groups: [],
        };
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    groupChange(carousel: ProductsCarouselData, group: BlockHeaderGroup): void {
        carousel.loading = true;
        carousel.abort$.next();

        (group as ProductsCarouselGroup).products$.pipe(
            tap(() => carousel.loading = false),
            takeUntil(merge(this.destroy$, carousel.abort$)),
        ).subscribe((x) => {
            carousel.products = x
            console.log(x);

        });
    }

    getTopBrands() {
        this.crud.getRequestNoAuth('exp/findallbrand').then((res: any) => {
            console.log(res);
            this.brands$ = of(res)
        }).catch((err: any) => {
            console.log(err);
        })
    }


    getColumnTopRated() {
        this.crud.getRequestNoAuth('exp/featuredproduct/0/5').then((res: any) => {
            console.log(res.content);
            this.columnTopRated$ = of(res.content)
        }).catch((err: any) => {
            console.log(err);
        })
    }

    getColumnSpecialOffers() {
        this.crud.getRequestNoAuth('exp/featuredproduct/0/5').then((res: any) => {
            console.log(res.content);
            this.columnSpecialOffers$ = of(res.content)
        }).catch((err: any) => {
            console.log(err);
        })
    }

    getColumnBestSellers() {
        this.crud.getRequestNoAuth('exp/featuredproduct/0/5').then((res: any) => {
            console.log(res.content);
            this.columnBestsellers$ = of(res.content)
        }).catch((err: any) => {
            console.log(err);
        })
    }

    getBestsellers() {
        this.crud.getRequestNoAuth('exp/featuredproduct/0/7').then((res: any) => {
            console.log(res.content);
            this.bestsellers$ = of(res.content)
        }).catch((err: any) => {
            console.log(err);
        })
    }

    getFeaturedProduct() {
        this.crud.getRequestNoAuth('exp/featuredproduct/0/20').then((res: any) => {
            console.log(res.content);
            let products = of(res.content)
            this.featuredProducts = {
                abort$: new Subject<void>(),
                loading: false,
                products: [],
                groups: [
                    {
                        name: 'All',
                        current: true,
                        products$: products,
                    },
                ],
            };
            this.groupChange(this.featuredProducts, this.featuredProducts.groups[0]);
        }).catch((err: any) => {
            console.log(err);
        })
    }



    getLastestProduct() {
        this.crud.getRequestNoAuth('exp/featuredproduct/0/20').then((res: any) => {
            console.log(res.content);
            let products = of(res.content)
            this.latestProducts = {
                abort$: new Subject<void>(),
                loading: false,
                products: [],
                groups: [
                    {
                        name: 'All',
                        current: true,
                        products$: products,
                    },
                ],
            };
            this.groupChange(this.latestProducts, this.latestProducts.groups[0]);
        }).catch((err: any) => {
            console.log(err);
        })
    }

    getCategories() {
        this.crud.getRequestNoAuth('exp/categorieswithsubs').then((res: any[]) => {
            console.log(res);
            this.popularCategories$ = of(this.popularCatStructure(res))
        }).catch((err: any) =>
            console.log(err)
        )
    }

    popularCatStructure(cats: any[]) {
           return cats.map((cat) => {
            return {
                name: cat.categoryName,
                image: cat.categoryImage ? cat.categoryImage: "assets/images/_dummy/mobile-phone.svg",
                path: "",
                type: "shop",
                id: cat.categoryId,
                slug: cat.categoryId,
                children: cat.subCategories.map((subCat) => {
                    return {
                        image: null,
                        name: subCat.name,
                        parents: null,
                        path: "",
                        type: "shop",
                        id: subCat.id,
                        slug: subCat.id,
                    }
                })
            }
        })
    }
}



