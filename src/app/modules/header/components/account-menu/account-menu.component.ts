import { AuthService } from './../../../../services/auth.service';
import { CrudService } from './../../../../services/crud.service';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-account-menu',
    templateUrl: './account-menu.component.html',
    styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {
    @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();
    email: string = ''
    password: string = ''
    showAlert: string = null
    alertType: string;
    userObj: any = null;
    loggedIn: boolean = false
    subscription: Subscription
    constructor(private crudService: CrudService, private auth: AuthService) {
        this.userState()
    }
    ngOnInit(): void {

    }

    userState() {
        this.subscription = this.auth.isLoggedIn.subscribe((obs) => {
            this.loggedIn = obs
        })
        this.subscription = this.auth.user.subscribe((obs: any) => {
            this.userObj = obs
        })
    }

    logout() {
        this.auth.logout()
    }

    login() {
        const data = {
            email: this.email,
            password: this.password
        }
        this.crudService.postRequestNoAuth('auth/login', data).then((res: any) => {
            console.log(res);
            if (res.code == 0) {
                this.auth.setLoginStatus(true)
                this.auth.setUserObj(res)
                window.location.reload()
                this.alertType = "primary"
                this.showAlert = res.message
            } else {
                this.alertType = "danger"
                this.showAlert = res.message
            }
        }).catch((err: any) => {
            console.log(err);
            this.alertType = "danger"
            this.showAlert = err.error.message
        })
    }
}
