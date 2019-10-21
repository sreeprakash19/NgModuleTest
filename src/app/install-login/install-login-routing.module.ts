import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstallLoginComponent } from './install-login.component';

const routes: Routes = [{ path: '', component: InstallLoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstallLoginRoutingModule { }
