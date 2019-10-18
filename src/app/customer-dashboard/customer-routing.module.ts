import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';


const routes = [
    { path: 'home', component: CustomerDashboardComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }


