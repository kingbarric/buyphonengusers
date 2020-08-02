import { QuickviewService } from './../../../../shared/services/quickview.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { AuthService } from './../../../../services/auth.service';
import { UtilService } from './../../../../services/util.service';
import { CrudService } from './../../../../services/crud.service';
import { Component, ViewChild, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-page-dashboard',
    templateUrl: './page-dashboard.component.html',
    styleUrls: ['./page-dashboard.component.sass']
})
export class PageDashboardComponent {
    userObj: any = null;
    orders: any[] = [];
    orderDetails:any = null;
    @ViewChild('modal', { read: TemplateRef }) template: TemplateRef<any>;

    modalRef: BsModalRef;
    constructor(private crud: CrudService, private util: UtilService, private auth: AuthService, private router: Router, private quickview: QuickviewService,
        private modalService: BsModalService) {
        this.getProfile()
    }

    ngOnInit(): void {
        this.auth.user.asObservable().subscribe((obs) => {
            this.userObj = obs
        })
        this.getOrders();
    }
    getProfile() {
        this.crud.getRequest('profile/getuserprofile').then((res: any) => {
            console.log(res);
            this.userObj = res.profile
        }).catch((err: any) => {
            console.log(err);
        })
    }

    navigateTo(path) {
        this.router.navigate([path])
    }

    getOrders() {
        this.crud.getRequest('order/findforusers/0/3').then((res: any) => {
            console.log(res);
            this.orders = res.content
        }).catch((err: any) => {
            console.log(err);
        })
    }

    showDetails(orderDetails:any) {
        if (this.modalRef) {
            this.modalRef.hide();
        }

        this.orderDetails = orderDetails;
        this.modalRef = this.modalService.show(this.template, { class: 'modal-dialog-centered modal-xl' });
    }

}
