import { States } from './../../../../../fake-server/database/states';
import { CrudService } from './../../../../services/crud.service';
import { AuthService } from './../../../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../../../shared/services/cart.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { RootService } from '../../../../shared/services/root.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './page-checkout.component.html',
    styleUrls: ['./page-checkout.component.scss']
})
export class PageCheckoutComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();
    loggedIn: boolean = false;
    subscription: Subscription;
    userObj: any = null;
    paymentType: string = null;
    total: number = 0;
    agreement: boolean = false;
    ref: string = `${Math.ceil(Math.random() * 10e10)}`;
    alertMsg: string = null
    alertType: string = 'primary' || 'warning' || 'success' || 'danger'
    buttonBusy: boolean = false;
    products: any[] = [];
    totalQuantity: number;
    orderDetails: any[] = []
    states: any[] = States;
    otherFees: any[] = []
    vat: number = 0;
    shipping: number = 0;
    placingOrder: boolean = false
    constructor(
        public root: RootService,
        public cart: CartService,
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthService,
        private crud: CrudService,
        // private paymentInstance: PaymentInstance
    ) {
        this.subscription = this.auth.user.subscribe((obs: any) => {
                this.userObj = obs
                this.getFullProfile()
                console.log(obs);
        })
        this.cart.total$.subscribe((total) => {
            this.total = total
        })
    }

    ngOnInit(): void {
        this.cart.quantity$.pipe(takeUntil(this.destroy$)).subscribe(quantity => {
            if (!quantity) {
                this.router.navigate(['../cart'], { relativeTo: this.route }).then();
            }
            this.totalQuantity = quantity
        });

        this.arrangeProduct()
    }

    getFullProfile() {
        this.crud.getRequest('profile/getuserprofile').then((res:any) => {
            this.userObj= res.profile
            console.log(this.userObj);

        }).catch((err: any) => {
            console.log(err);
        })
    }

    getRef(e, channel) {
        this.buttonBusy = true;
        this.alertType = 'warning';
        this.alertMsg = 'Please wait,preparing payment gateway';
        const data = {
            amount: this.total,
            channel: channel
        }
        this.crud.postRequest('transaction/getref', data).then((res: any) => {
            if (res.code == 0) {
                this.ref = res.ref;
                this.alertMsg = null;
            } else {
                this.alertType = 'danger';
                this.alertMsg = 'An error occured! Select another payment gateway';
            }
        }).catch((err: any) => {
            this.alertType = 'danger';
            this.alertMsg = 'An error occured! Select another payment gateway';
            console.log(err);
        }).finally(() => this.buttonBusy = false);
    }

    placeOrder() {
        this.alertMsg = null;
        this.alertType = 'warning';
        this.alertMsg = 'Please complete form to place order';
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    paymentInit() {
        console.log('Payment initialized');
        this.placingOrder = true
        setTimeout(() => {
            this.placingOrder = false
        }, 3000);
    }

    paymentDone(ref: any, channel) {
        console.log(ref);
        console.log(channel);

        if (channel == 'paystack' && ref?.status == 'success') {
            this.makeOrder()
        } if (channel == 'flutterwave' && ref?.respcode == '00') {
            this.makeOrder()
        }
        this.placingOrder = false
    }

    paymentCancel() {
        this.placingOrder = false
        console.log('payment failed');
    }

    makeOrder() {
        this.placingOrder = true
        const data = {
            totalPrice: this.total,
            totalQuantity: this.totalQuantity,
            transactionRef: this.ref,
            orderProfile: this.userObj,
            orderDetails: this.orderDetails,
            vat: this.vat,
            shippingFee: this.shipping
        }
        this.crud.postRequest('order/makeorder', data).then((res: any) => {
            this.router.navigateByUrl('shop/cart/checkout/success', { state: { orderInfo: res, otherFees: this.otherFees } })
            this.cart.emptyCart()
            this.placingOrder = false
        }).catch((err: any) => {
            console.log(err);
            this.placingOrder = false
        })
    }

    arrangeProduct() {
        this.cart.items$.subscribe((items: any[]) => {
            items.forEach((item) => {
                const data = {
                    price: item.product.salePrice, quantity: item.quantity, product: item.product.id
                }
                this.orderDetails.push(data)
            })
        })
        //
        this.cart.totals$.subscribe((totals: any) => {
            console.log(totals);
            this.otherFees = totals
            this.shipping = this.otherFees[0].price;
            this.vat = this.otherFees[1].price;
        })
    }


}
