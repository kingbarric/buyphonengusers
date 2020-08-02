import { UtilService } from './../services/util.service';
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

@Injectable({
  providedIn: "root",
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private util: UtilService,
    private authService: AuthService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
let pass = true
 if (!this.authService.getToken()) {
      this.util.showLoading();
      return next.handle(req).pipe(finalize(() => this.util.hideLoading()));
    }
    if (this.authService.getToken() || this.authService.getToken() != null
      ) {
      this.util.showLoading();
      const clonedreq = req.clone({
        headers: req.headers.set("Authorization", this.authService.getToken()),
         withCredentials: true,
      });
      return next.handle(clonedreq).pipe(
        tap(
          succ => {},
          err => {
            console.log(err);
            if (err.status == 0) {
            //   this.util.openSnackBar("Check your Network Connectivity");
            }
            if (err.status === 401) {
            //   this.cookService.delete("session_id", "/");
            //   this.authService.storeUserObs(null);
            //   this.router.navigate(["/login"]);
            }
          }
        ),
        finalize(() => this.util.hideLoading())
      );
    } else {
      return next.handle(req);
    }
  }
}
