import { CrudService } from './../../../../services/crud.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../../../shared/api/shop.service';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-page-product',
    templateUrl: './page-product.component.html',
    styleUrls: ['./page-product.component.scss']
})
export class PageProductComponent implements OnInit {
    relatedProducts$: Observable<any[]>;

    product: any;
    layout: 'standard' | 'columnar' | 'sidebar' = 'standard';
    sidebarPosition: 'start' | 'end' = 'start'; // For LTR scripts "start" is "left" and "end" is "right"

    constructor(
        private shop: ShopService,
        private route: ActivatedRoute,
        private crud: CrudService
    ) { }

    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.layout = data.layout || this.layout;
            this.sidebarPosition = data.sidebarPosition || this.sidebarPosition;
            this.getProduct(data.product);
        });
        this.getRelatedProduct()
    }

    getRelatedProduct() {
        this.crud.getRequestNoAuth('exp/featuredproduct/0/20').then((res: any) => {
            this.relatedProducts$ = of(res.content)
        }).catch((err: any) => {
            console.log(err);
        })
    }

    getProduct(id) {
        this.crud.getRequestNoAuth(`exp/findproductbyid/${id}`).then((res: any) => {
            console.log(res);
            this.product = res;
        }).catch((err: any) => {
            console.log(err);
        })
    }
}
