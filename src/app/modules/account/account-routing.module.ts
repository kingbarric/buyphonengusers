import { PageActivateAccountComponent } from './pages/page-activate-account/page-activate-account.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageLoginComponent } from "./pages/page-login/page-login.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { PageDashboardComponent } from "./pages/page-dashboard/page-dashboard.component";
import { PageOrdersListComponent } from "./pages/page-orders-list/page-orders-list.component";
import { PageAddressesListComponent } from "./pages/page-addresses-list/page-addresses-list.component";
import { PageProfileComponent } from "./pages/page-profile/page-profile.component";
import { PagePasswordComponent } from "./pages/page-password/page-password.component";
import { PageOrderDetailsComponent } from "./pages/page-order-details/page-order-details.component";
import { PageEditAddressComponent } from "./pages/page-edit-address/page-edit-address.component";
import { UserComponent } from "./user/user.component";
import { MerchantComponent } from "./merchant/merchant.component";

const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [
            {
                path: "",
                pathMatch: "full",
                redirectTo: "dashboard",
            },
            {
                path: "dashboard",
                component: UserComponent,
            },
            {
                path: "orders",
                component: PageProfileComponent,
            },
            {
                path: "profile",
                component: PageAddressesListComponent,
            },
            {
                path: "notification",
                component: PageEditAddressComponent,
            },
            {
                path: "order-tracking",
                component: PageOrdersListComponent,
            },
            {
                path: "whishlist",
                component: PageOrderDetailsComponent,
            },
            {
                path: "safety",
                component: PagePasswordComponent,
            },
            {
                path: "user",
                component: UserComponent,
            },
        ],
    },
    {
        path: "login",
        component: PageLoginComponent,
    },
    {
        path: "account-activation",
        component: PageActivateAccountComponent,
    },
    {
        path: "register-as-merchant",
        component: MerchantComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccountRoutingModule {}
