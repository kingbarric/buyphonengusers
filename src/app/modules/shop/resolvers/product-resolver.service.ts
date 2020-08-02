import { CrudService } from './../../../services/crud.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Product } from '../../../shared/interfaces/product';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { RootService } from '../../../shared/services/root.service';
import { ShopService } from '../../../shared/api/shop.service';

@Injectable({
    providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product> {
    constructor(
        private root: RootService,
        private router: Router,
        private shop: ShopService,
        private crud: CrudService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
        const productSlug = route.params.productSlug

        return productSlug
    }
}
