import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeatureFinalComponent } from './feature-final.component';

const routes: Routes = [{ path: '', component: FeatureFinalComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureFinalRoutingModule { }
