import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { UtilService } from "./util.service";

@Injectable({
    providedIn: "root",
})
export class CrudService {
    private baseUrl: string;
    private headers: HttpHeaders;
    rootUrl: string;
    constructor(private http: HttpClient, private utilService: UtilService,private auth:AuthService) {
        // this.rootUrl = "http://172.20.10.4:8082/";
        // this.rootUrl = "http://192.168.43.115:8082/";
        this.rootUrl = "http://fbe1d88280d4.ngrok.io/";
        this.baseUrl = `${this.rootUrl}api/`;
        this.setHeaderWithToken();
    }

    private setHeaderWithToken() {
        this.headers = new HttpHeaders({
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + this.auth.getToken(),
        });
    }

    getRequest(url) {
        this.setHeaderWithToken();
        return this.http
            .get(`${this.baseUrl}${url}`, { headers: this.headers })
            .toPromise();
    }

    postRequest(url, data) {
        this.setHeaderWithToken();
        return this.http
            .post(`${this.baseUrl}${url}`, data, { headers: this.headers })
            .toPromise();
    }

    registerUser(url, data): Promise<object> {
        return this.http
            .post(`${this.rootUrl}${url}`, data, { headers: this.headers })
            .toPromise();
    }

    login(url, data): Promise<object> {
        return this.http
            .post(`${this.rootUrl}${url}`, data, { headers: this.headers })
            .toPromise();
    }

}