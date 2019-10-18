import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeatureStartComponent } from './feature-start.component';

const routes: Routes = [{ path: '', component: FeatureStartComponent },
{ path: 'feature-final', loadChildren: () => import('../feature-final/feature-final.module').then(m => m.FeatureFinalModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureStartRoutingModule { }
