import { QuickviewService } from './../../../../shared/services/quickview.service';
import { Router } from '@angular/router';
import { UtilService } from './../../../../services/util.service';
import { AuthService } from './../../../../services/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CrudService } from './../../../../services/crud.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-page-notification',
    templateUrl: './page-notification.component.html',
    styleUrls: ['./page-notification.component.scss']
})
export class PageNotificationComponent implements OnInit {
    orders: any[] = [];
    page: number = 0;
    limit: number = 20;
    totalPages: number = 0;
    @ViewChild('modal', { read: TemplateRef }) template: TemplateRef<any>;
    modalRef: BsModalRef;
    notifications: any[] = [];
    notification: any = null
    unreadNotificationCount: number = 0;
    constructor(private crud: CrudService, private util: UtilService, private auth: AuthService, private router: Router, private quickview: QuickviewService,
        private modalService: BsModalService) { }

    ngOnInit(): void {
        this.getNotification();
    }
    changePage(page) {
        this.page = parseInt(page) - 1
        console.log(this.page);
        this.getNotification();
    }

    getNotification() {
        this.crud.getRequest(`notification/findforuser/${this.page}/${this.limit}`).then((res: any) => {
            console.log(res);
            this.notifications = res.content
            this.totalPages = res.totalPages;
            this.countUnreadNotifications()
        }).catch((err: any) => {
            console.log(err);
        })
    }


    readMessage(notificationId) {
        this.crud.getRequest(`notification/updatestatus/${notificationId}`).then((res: any) => {
            console.log(res);
            this.getNotification();
        }).catch((err: any) => {
            console.log(err);
        })
    }

    showDetails(notification: any) {
        if (this.modalRef) {
            this.modalRef.hide();
        }
        this.notification = notification;
        if (!notification.isRead) {
            this.readMessage(notification.id)
        }
        this.modalRef = this.modalService.show(this.template, { class: 'modal-dialog-centered modal-xl' });
    }


    countUnreadNotifications() {
        this.unreadNotificationCount = 0
        this.notifications.forEach((notification: any) => {
            if (!notification.isRead) {
                this.unreadNotificationCount++
            }
        })
    }
}
