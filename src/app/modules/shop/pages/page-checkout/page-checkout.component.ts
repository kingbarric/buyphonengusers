import { AuthService } from './../../../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../../../shared/services/cart.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { RootService } from '../../../../shared/services/root.service';

import { RaveOptions } from 'angular-rave';
import { PaystackOptions } from 'angular4-paystack';

@Component({
    selector: 'app-checkout',
    templateUrl: './page-checkout.component.html',
    styleUrls: ['./page-checkout.component.scss']
})
export class PageCheckoutComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();
    loggedIn: boolean = false
    subscription: Subscription
    userObj: Object = null
    paymentType: string = null
    paymentOptions: RaveOptions = {
        PBFPubKey: 'FLWPUBK-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        customer_email: 'mailexample@mail.com',
        customer_firstname: 'Ashinze',
        customer_lastname: 'Ekene',
        custom_description: 'Payment for goods',
        amount: 500000,
        customer_phone: '09026464646',
        txref: 'a-unique-reference',
        currency: "NGN"
    }
    options: PaystackOptions = {
        amount: 50000,
        email: 'user@mail.com',
        ref: `${Math.ceil(Math.random() * 10e10)}`
    }
    constructor(
        public root: RootService,
        public cart: CartService,
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthService
    ) {
        this.subscription = this.auth.isLoggedIn.subscribe((obs) => {
            this.loggedIn = obs
        })
        this.subscription = this.auth.user.subscribe((obs: any) => {
            this.userObj = obs
        })
    }

    ngOnInit(): void {
        this.cart.quantity$.pipe(takeUntil(this.destroy$)).subscribe(quantity => {
            if (!quantity) {
                this.router.navigate(['../cart'], { relativeTo: this.route }).then();
            }
        });
    }

    placeOrder() {
        console.log(this.paymentType);

    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    paymentInit() {
        console.log('Payment initialized');
    }

    paymentDone(ref: any) {
        // this.title = 'Payment successfull';
        console.log(ref);
    }

    paymentCancel() {
        console.log('payment failed');
    }
}
