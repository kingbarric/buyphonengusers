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

    constructor() {
        this.isLoggedIn = new BehaviorSubject<boolean>(null);

        if (this.getToken()) {
            this.isLoggedIn.next(true);
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
}
