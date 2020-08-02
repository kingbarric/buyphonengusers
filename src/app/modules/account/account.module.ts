// modules (angular)
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";
// modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';
// modules
import { BlocksModule } from '../blocks/blocks.module';
import { WidgetsModule } from '../widgets/widgets.module';

import { AccountRoutingModule } from "./account-routing.module";
// components
import { LayoutComponent } from "./components/layout/layout.component";
import { PageActivateAccountComponent } from './pages/page-activate-account/page-activate-account.component';
// pages
import { PageAddressesListComponent } from "./pages/page-addresses-list/page-addresses-list.component";
import { PageDashboardComponent } from "./pages/page-dashboard/page-dashboard.component";
import { PageEditAddressComponent } from "./pages/page-edit-address/page-edit-address.component";
import { PageLoginComponent } from "./pages/page-login/page-login.component";
import { PageNotificationComponent } from './pages/page-notification/page-notification.component';
import { PageOrderDetailsComponent } from "./pages/page-order-details/page-order-details.component";
import { PageOrdersListComponent } from "./pages/page-orders-list/page-orders-list.component";
import { PagePasswordComponent } from "./pages/page-password/page-password.component";
import { PageProfileComponent } from "./pages/page-profile/page-profile.component";


@NgModule({
    declarations: [
        // components
        LayoutComponent,
        // pages
        PageAddressesListComponent,
        PageDashboardComponent,
        PageLoginComponent,
        PageOrdersListComponent,
        PagePasswordComponent,
        PageProfileComponent,
        PageOrderDetailsComponent,
        PageEditAddressComponent,
        PageActivateAccountComponent,
        PageNotificationComponent
    ],
    imports: [
        // modules (angular)
        CommonModule,
        // modules
        AccountRoutingModule,
        SharedModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CarouselModule,
        BlocksModule,
        WidgetsModule,
    ],
})
export class AccountModule { }
