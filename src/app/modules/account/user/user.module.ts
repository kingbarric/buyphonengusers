import { NgModule } from "@angular/core";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    imports: [UserRoutingModule],
    declarations: [UserComponent, DashboardComponent],
})
export class UserModule {}
