import { AuthService } from './../../../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudService } from './../../../../services/crud.service';
import { Component } from "@angular/core";

@Component({
    selector: "app-login",
    templateUrl: "./page-login.component.html",
    styleUrls: ["./page-login.component.scss"],
})
export class PageLoginComponent {
    showLoginForm: string = "display";
    showRegisterForm: string = "hidden";
    changeLoginColor: boolean = false;
    changeRegisterColor: boolean = true;
    password: string = ''
    email: string = ''
    registerForm: FormGroup
    showAlert: string = null
    alertType: string
    constructor(private crudService: CrudService, private auth: AuthService) { this.init() }

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

    init() {
        this.registerForm = new FormGroup({
            firstname: new FormControl("", [Validators.required]),
            lastname: new FormControl("", [Validators.required]),
            email: new FormControl("", [Validators.required, Validators.email]),
            password: new FormControl("", [Validators.required, Validators.minLength(6)]),
            confirmPassword: new FormControl("", [Validators.required]),
            phoneNumber: new FormControl("", [Validators.required]),
            username: new FormControl("", [Validators.required]),
            userType: new FormControl("USER", [Validators.required]),
        }, {
            // validator: this.MustMatch('password', 'confirmPassword')
        })
    }

    MustMatch(password: string, confirmPassword: string) {
        if (password === confirmPassword) {
            return true
        }
        this.registerForm.setErrors({
            notSame: true
        })
        return false
    }

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

    register() {
        let password: string = this.registerForm.controls.password.value
        let conPassword: string = this.registerForm.controls.confirmPassword.value

        if (!this.MustMatch(password, conPassword)) {
            return
        }

        this.crudService.registerUser('users/register', this.registerForm.value).then((res: any) => {
            console.log(res);
            if (res.code == 0) {
                this.showAlert = res.message
                this.alertType = "primary"
                this.registerForm.reset()
            }
            else {
                this.alertType = "danger"
                this.showAlert = res.message
            }
        }).catch((err: any) => {
            this.alertType = "danger"
            this.showAlert = err.message

        })
    }
}