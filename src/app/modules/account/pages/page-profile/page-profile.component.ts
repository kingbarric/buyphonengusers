import { CrudService } from './../../../../services/crud.service';
import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-profile',
    templateUrl: './page-profile.component.html',
    styleUrls: ['./page-profile.component.sass']
})
export class PageProfileComponent implements OnInit {
    userObj: any = null;
    constructor(private auth: AuthService, private crud: CrudService) {
        this.getProfile();
    }

    ngOnInit(): void {
        this.auth.user.asObservable().subscribe((obs) => {
            this.userObj = obs
        })
    }
    getProfile() {
        this.crud.getRequest('profile/getuserprofile').then((res: any) => {
            console.log(res);
            this.userObj = res.profile
        }).catch((err: any) => {
            console.log(err);
        })
    }
}
