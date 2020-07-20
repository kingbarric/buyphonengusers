import { CrudService } from './../../../../services/crud.service';
import { AuthService } from './../../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './../../../../shared/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { order } from '../../../../../data/account-order-details';
import { Order } from '../../../../shared/interfaces/order';
import { RootService } from '../../../../shared/services/root.service';

@Component({
    selector: 'app-page-order-success',
    templateUrl: './page-order-success.component.html',
    styleUrls: ['./page-order-success.component.scss']
})
export class PageOrderSuccessComponent implements OnInit {
    order: any = order;
    otherFees: any[] = [];
    constructor(
        public root: RootService,
        public cart: CartService,
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthService,
        private crud: CrudService,
    ) {
        if (!history.state.orderInfo) {
            this.router.navigate(['/account/orders'], { relativeTo: this.route }).then();
        }
        // this.order = JSON.parse(localStorage.getItem('order'))
        // console.log(this.order)
    }

    ngOnInit() {
        this.order = history.state.orderInfo
        this.otherFees = history.state.otherFees
        console.log(history.state);

    }
}
