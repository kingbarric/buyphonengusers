import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { finalize } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { UtilService } from "./util.service";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private utilService: UtilService,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let state = true;
    if (state) {
      this.utilService.showLoading();
      const clonedreq = req.clone({
        withCredentials: true,
      });
      return next.handle(clonedreq).pipe(
        tap(
          (succ) => {},
          (err) => {
            console.log(err);
            if (err.status == 0) {
            //   this.utilService.toast("info", "Check your Network Connectivity");
            }
            if (err.status === 401) {
              console.log("do nothing");
            }
          }
        ),
        finalize(() => this.utilService.hideLoading())
      );
    } else {
      return next.handle(req);
    }
  }
}
