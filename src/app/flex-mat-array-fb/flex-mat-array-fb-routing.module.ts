import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlexMatArrayFBComponent } from './flex-mat-array-fb.component';

const routes: Routes = [{ path: '', component: FlexMatArrayFBComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlexMatArrayFBRoutingModule { }
