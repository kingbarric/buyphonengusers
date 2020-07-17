import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { QuickviewService } from './../../../../shared/services/quickview.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from './../../../../services/crud.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';


@Component({
    selector: 'app-page-orders-list',
    templateUrl: './page-orders-list.component.html',
    styleUrls: ['./page-orders-list.component.sass']
})
export class PageOrdersListComponent implements OnInit {
    orders: any[] = [];
    page: number = 0;
    limit: number = 20;
    totalPages: number = 0;
    orderDetails:any = null;

    @ViewChild('modal', { read: TemplateRef }) template: TemplateRef<any>;

    modalRef: BsModalRef;
    constructor(private crud: CrudService, private quickview: QuickviewService,
        private modalService: BsModalService) { }

    ngOnInit() {
        this.getOrders()
    }

    changePage(page) {
        this.page = parseInt(page) - 1
        console.log(this.page);
        this.getOrders();
    }

    getOrders() {
        this.crud.getRequest(`order/findforusers/${this.page}/${this.limit}`).then((res: any) => {
            console.log(res);
            this.orders = res.content
            this.totalPages = res.totalPages
        }).catch((err: any) => {
            console.log(err);
        })
    }

    showDetails(orderDetails:any){
        if (this.modalRef) {
            this.modalRef.hide();
        }

        this.orderDetails = orderDetails;
        this.modalRef = this.modalService.show(this.template, { class: 'modal-dialog-centered modal-xl' });
    }

}
