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
    constructor() {}

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
}
