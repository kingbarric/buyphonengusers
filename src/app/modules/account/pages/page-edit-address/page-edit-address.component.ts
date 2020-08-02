import { States } from './../../../../../fake-server/database/states';
import { AuthService } from './../../../../services/auth.service';
import { CrudService } from './../../../../services/crud.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-page-edit-address',
    templateUrl: './page-edit-address.component.html',
    styleUrls: ['./page-edit-address.component.scss']
})
export class PageEditAddressComponent {
    userObj: any = null;
    states: any[] = States;
    alertMsg: string = null;
    alertType: string = 'warning' || 'primary' || 'danger' || 'success'
    constructor(private crud: CrudService, private auth: AuthService) {

    }

    ngOnInit(): void {
        this.auth.user.asObservable().subscribe((obs) => {
            this.userObj = obs
        })
        this.getProfile();
    }
    getProfile() {
        this.crud.getRequest('profile/getuserprofile').then((res: any) => {
            console.log(res);
            this.userObj = res.profile
        }).catch((err: any) => {
            console.log(err);
        })
    }


    update() {
        this.crud.postRequest('profile/updateprofile', this.userObj).then((res: any) => {
            console.log(res);
            this.alertType= 'primary';
            this.alertMsg =res.body.message
        }).catch((err: any) => {
            console.log(err);
            this.alertType= 'danger';
            this.alertMsg =err.body.message
        })
    }
}
