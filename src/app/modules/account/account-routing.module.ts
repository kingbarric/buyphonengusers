import { AuthGuard } from './../../guards/auth.guard';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { CommonModule } from '@angular/common';
import { PageNotificationComponent } from './pages/page-notification/page-notification.component';
import { PageActivateAccountComponent } from './pages/page-activate-account/page-activate-account.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageLoginComponent } from "./pages/page-login/page-login.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { PageOrdersListComponent } from "./pages/page-orders-list/page-orders-list.component";
import { PageAddressesListComponent } from "./pages/page-addresses-list/page-addresses-list.component";
import { PageProfileComponent } from "./pages/page-profile/page-profile.component";
import { PagePasswordComponent } from "./pages/page-password/page-password.component";
import { PageOrderDetailsComponent } from "./pages/page-order-details/page-order-details.component";
import { PageEditAddressComponent } from "./pages/page-edit-address/page-edit-address.component";

const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: "",
                pathMatch: "full",
                redirectTo: "dashboard",
            },
            {
                path: "dashboard",
                component: PageDashboardComponent,
            },
            {
                path: "profile",
                component: PageProfileComponent,
            },
            {
                path: "address",
                component: PageAddressesListComponent,
            },
            {
                path: "update-profile",
                component: PageEditAddressComponent,
            },
            {
                path: "orders",
                component: PageOrdersListComponent,
            },
            {
                path: "order-details/:ref",
                component: PageOrderDetailsComponent,
            },
            {
                path: "notification",
                component: PageNotificationComponent,
            },
            {
                path: "update-password",
                component: PagePasswordComponent,
            }
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
    // {
    //     path: "register-as-merchant",
    //     component: MerchantComponent,
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule],
    exports: [RouterModule],
})
export class AccountRoutingModule { }
