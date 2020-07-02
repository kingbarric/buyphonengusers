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
    constructor(private crudService: CrudService) { }

    login() {
        const data = {
            email: this.email,
            password: this.password
        }
        this.crudService.postRequest('', data).then((res) => {
            console.log(res);

        }).catch((err: any) => {
            console.log(err);

        })
    }
}
