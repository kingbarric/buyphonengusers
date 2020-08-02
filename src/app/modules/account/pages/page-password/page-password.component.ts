import { CrudService } from './../../../../services/crud.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-password',
    templateUrl: './page-password.component.html',
    styleUrls: ['./page-password.component.sass']
})
export class PagePasswordComponent implements OnInit {
    passwordForm: FormGroup;
    alertMsg: string = null;
    alertType: string = 'warning' || 'primary' || 'danger'

    constructor(private formBuilder: FormBuilder, private crud: CrudService) { }

    ngOnInit() {
        this.passwordForm = this.formBuilder.group({
            oldPassword: ['', [Validators.required]],
            newPassword: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: this.MustMatch('newPassword', 'confirmPassword')
        });
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

    // convenience getter for easy access to form fields
    checker(): boolean {
        if (this.passwordForm.controls.oldPassword.errors?.required) {
            this.alertType = 'warning';
            this.alertMsg = 'Old password is required';
            return false;
        }
        if (this.passwordForm.controls.newPassword.errors?.required) {
            this.alertType = 'warning';
            this.alertMsg = 'New Password is required';
            return false;
        }
        if (this.passwordForm.controls.newPassword.errors?.minlength) {
            this.alertType = 'warning';
            this.alertMsg = 'Password must be at least 6 characters';
            return false;
        }
        if (this.passwordForm.controls.confirmPassword.errors?.required) {
            this.alertType = 'warning';
            this.alertMsg = 'Re-enter your new password';
            return false;
        }
        if (this.passwordForm.controls.confirmPassword.errors?.mustMatch) {
            this.alertType = 'warning';
            this.alertMsg = 'Passwords do not match';
            return false;
        }

        this.alertMsg = null;
        return true
    }

    onSubmit() {
        if (!this.checker()) return;
        this.crud.postRequest('profile/updatepassword', this.passwordForm.value).then((res: any) => {
            console.log(res);
            this.passwordForm.reset()
        }).catch((err: any) => {
            console.log(err);
        })
    }
}
