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
    private imagePath = "https://service.mall1811.com/";
  constructor(private http: HttpClient, private utilService: UtilService) {
    // this.rootUrl = "http://172.20.10.4:8082/";
    // this.rootUrl = "http://192.168.43.115:8082/";
    this.rootUrl = "https://mall1811webapi.herokuapp.com/";
    this.baseUrl = `${this.rootUrl}api/`;
    this.setHeaderWithToken();
  }

  private setHeaderWithToken() {
    this.headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + this.utilService.getToken(),
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
}
