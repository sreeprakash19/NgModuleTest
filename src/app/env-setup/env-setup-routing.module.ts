import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnvSetupComponent } from './env-setup.component';

const routes: Routes = [{ path: '', component: EnvSetupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvSetupRoutingModule { }
