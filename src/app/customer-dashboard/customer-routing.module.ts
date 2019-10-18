import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';


const routes = [
    { path: 'home', component: CustomerDashboardComponent },
   // { path: 'feature-start', loadChildren: () => import('../feature-start/feature-start.module').then(m => m.FeatureStartModule) }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }


