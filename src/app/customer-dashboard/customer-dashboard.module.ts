import { NgModule } from '@angular/core';

import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { SharedModule } from '../shared/shared.module';

import { CustomerRoutingModule } from './customer-routing.module';
import {AppMaterialModule} from '../app-material/app-material.module';
//import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomerDashboardComponent],
  imports: [

    SharedModule,
    //ReactiveFormsModule,
    CustomerRoutingModule,
    AppMaterialModule
  ]
})
export class CustomerDashboardModule { }
