import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from '../../../../shared/services/cart.service';
import { CartItem } from '../../../../shared/interfaces/cart-item';
import { RootService } from '../../../../shared/services/root.service';

@Component({
    selector: 'app-header-dropcart',
    templateUrl: './dropcart.component.html',
    styleUrls: ['./dropcart.component.scss']
})
export class DropcartComponent {
    removedItems: any[] = [];

    @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        public cart: CartService,
        public root: RootService
    ) { }

    remove(item: any): void {
        if (this.removedItems.includes(item)) {
            return;
        }

        this.removedItems.push(item);
        this.cart.remove(item).subscribe({complete: () => this.removedItems = this.removedItems.filter(eachItem => eachItem !== item)});
    }
}
