import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { UtilService } from "./util.service";
import { CrudService } from './crud.service';

@Injectable({
    providedIn: "root"
})
export class AuthService {

    isLoggedIn: BehaviorSubject<boolean>;
    user: BehaviorSubject<any>;
    constructor() {
        this.isLoggedIn = new BehaviorSubject<boolean>(null);
        this.user = new BehaviorSubject<any>(null);

        if (this.getToken()) {
            this.isLoggedIn.next(true);
            this.user.next(this.getUserObject())
        } else {
            this.isLoggedIn.next(false);
        }
    }

    logInStatus() {
        return this.isLoggedIn;
    }

    setLoginStatus(state: boolean): void {
        this.isLoggedIn.next(state);
    }

    setUserObj(user) {
        localStorage.setItem("session", JSON.stringify(user))
    }

    getToken() {
        if (localStorage.getItem("session") !== null) {
            return JSON.parse(localStorage.getItem("session")).token;
        }
        return null;
    }

    getUserObject() {
        const user = JSON.parse(localStorage.getItem("session"));
        return user;
    }

    logout() {
        this.isLoggedIn.next(false);
        this.user.next(null)
        localStorage.removeItem("session")
        window.location.reload()
    }
}
