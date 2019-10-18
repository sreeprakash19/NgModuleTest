import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeatureStartComponent } from './feature-start.component';

const routes: Routes = [{ path: '', component: FeatureStartComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureStartRoutingModule { }
