import { Component } from "@angular/core";

@Component({
    selector: "app-layout",
    templateUrl: "./layout.component.html",
    styleUrls: ["./layout.component.sass"],
})
export class LayoutComponent {
    links: { label: string; url: string }[] = [
        { label: "dashboard", url: "./dashboard" },
        { label: "Orders", url: "./orders" },
        // { label: "Order Tracking", url: "./order-details" },
        { label: "Whishlist", url: "/shop/wishlist" },
        { label: "Profile", url: "./profile" },
        { label: "Notification", url: "./notification" },
        { label: "Change Password", url: "./update-password" },
    ];

    constructor() { }
}
