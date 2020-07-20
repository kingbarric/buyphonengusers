import { CrudService } from './../../../../services/crud.service';
import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { ProductFeaturesSection } from '../../../../shared/interfaces/product';
import { specification } from '../../../../../data/shop-product-spec';
import { reviews } from '../../../../../data/shop-product-reviews';
import { Review } from '../../../../shared/interfaces/review';

@Component({
    selector: 'app-product-tabs',
    templateUrl: './product-tabs.component.html',
    styleUrls: ['./product-tabs.component.scss']
})
export class ProductTabsComponent implements OnInit,OnChanges {
    @Input() withSidebar = false;
    @Input() tab: 'description' | 'specification' | 'reviews' = 'description';
    @Input() product: any = null;
    reviews: Review[] = reviews;
    reviewss:any[]= []
    rating: any = 5
    review: string = ''
    buttonBusy: boolean = false;
    alertMsg: string = null
    alertType: 'primary' | 'danger' | 'success';
    pageNo: number = 0;
    limit: number = 5;
    totalPages:number = 0
    constructor(private crud: CrudService) { }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.product?.id  != null || this.product?.id != undefined) {
            this.getReviews()
          }
      }

    getReviews() {
        this.crud.getRequestNoAuth(`exp/findratingsreviewbyproductid/${this.product.id}/${this.pageNo}/${this.limit}`).then((res: any) => {
            console.log(res);
            this.reviewss = res.content
            this.totalPages = res.totalPages
        }).catch((err: any) => {
            console.log(err);

        })
    }

    pageEvent(page){
        this.pageNo = parseInt(page) - 1;
        this.getReviews()
    }

    submitReview() {
        this.buttonBusy = true
        const data = {
            reviews: this.review,
            rating: this.rating,
            productId: this.product.id
        }
        this.crud.postRequest('ratingsreview/saveratingsreview', data).then((res: any) => {
            console.log(res);
            this.alertType = 'success';
            this.alertMsg = res.message
            this.review = '';
            this.rating = 5;
        }).catch((err: any) => {
            console.log(err);
            this.alertType = 'danger';
            this.alertMsg = 'Error rating product'
        }).finally(() => this.buttonBusy = false)
    }

}
