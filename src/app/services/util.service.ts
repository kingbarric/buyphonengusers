import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
// import Swal from "sweetalert2";
import { Router, NavigationEnd } from "@angular/router";
import { BehaviorSubject } from "rxjs";

declare var $: any;

@Injectable({
  providedIn: "root",
})
export class UtilService {
  Toast: any;
  toggleLoading: any;
  toggleLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(private router: Router) {}


//   toast(messageType: any, message: any) {
//     this.Toast = Swal.mixin({
//       toast: true,
//       position: "top-end",
//       showConfirmButton: false,
//       timer: 3000,
//     });
//     this.Toast.fire({
//       type: messageType,
//       title: message,
//     });
//   }

  getItemFromCart(id) {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    let result = null;

    if (cartItems) {
      cartItems.forEach((item) => {
        if (item.id === id) {
          result = item;
        }
      });
    }
    return result;
  }

  emptyCart() {
    localStorage.removeItem("cart");
  }

  addToCart(item) {
    const check = this.getItemFromCart(item.id);
    const cartItems = JSON.parse(localStorage.getItem("cart"));

    if (!check) {
      if (cartItems) {
        cartItems.push(item);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        return;
      } else {
        const cart = [];
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    } else {
      return "Item already in cart";
    }
  }

  getCartItems() {
    let cartItems = [];
    if (JSON.parse(localStorage.getItem("cart")) !== null) {
      cartItems = JSON.parse(localStorage.getItem("cart"));
    }
    return cartItems;
  }

  scrollToTop() {
    this.router.events.subscribe((evt) => {
      const body = $("html, body");
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      body.stop().animate({ scrollTop: 0 }, 500, "swing");
    });
  }

  hideLoading() {
    this.toggleLoading = true;
    return this.toggleLoadingSubject.next(false);
  }

  showLoading() {
    this.toggleLoading = false;
    return this.toggleLoadingSubject.next(true);
  }

  loadingState() {
    return this.toggleLoadingSubject;
  }
}
