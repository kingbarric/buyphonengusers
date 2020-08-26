import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../../services/auth.service';
import { CrudService } from './../../../../services/crud.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-activate-account',
    templateUrl: './page-activate-account.component.html',
    styleUrls: ['./page-activate-account.component.scss']
})
export class PageActivateAccountComponent implements OnInit {
    showLoginForm: string = "display";
    showRegisterForm: string = "hidden";
    changeLoginColor: boolean = false;
    changeRegisterColor: boolean = true;
    activationCode: number = null
    email: string = ''
    showAlert: string = null
    alertType: string
    constructor(private crudService: CrudService, private auth: AuthService, private router: Router,private route:ActivatedRoute) {
        this.auth.isLoggedIn.subscribe((obs: any) => {
            if (obs) {
                this.router.navigate(['/'])
            }
        })
        this.route.params.subscribe(
            params => {
                if (params.email) {
                   this.email =params.email
                }else{
                    this.router.navigate(["account/login"])
                }
            },
            err=> console.log(err)
        )
    }
    ngOnInit() { }

    toggle(formToDisplay) {
        if (formToDisplay === "login") {
            this.showLoginForm = "display";
            this.showRegisterForm = "hidden";
            this.changeLoginColor = false;
            this.changeRegisterColor = true;
        } else {
            this.showRegisterForm = "display";
            this.showLoginForm = "hidden";
            this.changeLoginColor = true;
            this.changeRegisterColor = false;
        }
    }




    activate() {
        const data = {
            activationCode: this.activationCode,
            email: this.email
        }
        this.crudService.postRequestNoAuth('users/activate', data).then((res: any) => {
            console.log(res);
            if (res.code == 0) {
                this.router.navigate(["account/login"])
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

    resendCode() {
        this.crudService.getRequestNoAuth(`users/sendactivationcode/${this.email}`).then((res: any) => {
            console.log(res);
            if (res.code == 0) {
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
