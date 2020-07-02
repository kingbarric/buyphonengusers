import { AuthService } from './../../../../services/auth.service';
import { CrudService } from './../../../../services/crud.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-account-menu',
    templateUrl: './account-menu.component.html',
    styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent {
    @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();
    email: string = ''
    password: string = ''
    showAlert: string = null
    alertType: string
    constructor(private crudService: CrudService, private auth: AuthService) { }

    login() {
        const data = {
            email: this.email,
            password: this.password
        }
        this.crudService.login('auth/login', data).then((res: any) => {
            console.log(res);
            if (res.code == 0) {
                this.auth.setLoginStatus(true)
                this.auth.setUserObj(res)
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
