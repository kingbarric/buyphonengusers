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
    constructor(private crudService: CrudService) { this.init() }

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
            phone: new FormControl("", [Validators.required]),
        }, {
            // validator: this.MustMatch('password', 'confirmPassword')
        })
    }

    MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }

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

    register() {
        this.crudService.postRequest('', this.registerForm.value).then((res) => {
            console.log(res);

        }).catch((err: any) => {
            console.log(err);

        })
    }
}
