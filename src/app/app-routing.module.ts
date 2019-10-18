import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/feature-start', pathMatch: 'full'},

  { path: 'feature-start', loadChildren: () => import('./feature-start/feature-start.module').then(m => m.FeatureStartModule) }
];
//Learning - if the Primary module lazy loads then it is same as app module
//Learning 101 -> appModule maintains the state. We can use the Main Module to change state for loading lazy modules 
//but we cannot load another lazy module after that, we need to return to the main module.
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
