import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../../shared/interfaces/order';
import { order } from '../../../../../data/account-order-details';

@Component({
    selector: 'app-page-order-details',
    templateUrl: './page-order-details.component.html',
    styleUrls: ['./page-order-details.component.scss']
})
export class PageOrderDetailsComponent implements OnInit {
    order: Order = order;
    @Input() orderDetails: any;
    constructor() { }
    ngOnInit() {
        console.log(this.orderDetails);
// this.processOrder()
    }

    // processOrder(){
    //     this.orderDetails.
    // }
}
