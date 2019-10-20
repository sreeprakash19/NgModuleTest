import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'feature-start', loadChildren: () => import('./feature-start/feature-start.module').then(m => m.FeatureStartModule) },
  { path: 'feature-final', loadChildren: () => import('./feature-final/feature-final.module').then(m => m.FeatureFinalModule) },
  { path: 'install-login', loadChildren: () => import('./install-login/install-login.module').then(m => m.InstallLoginModule) },
  { path: 'login-fail', loadChildren: () => import('./install-login/install-login.module').then(m => m.InstallLoginModule) },
  { path: 'login-retry', loadChildren: () => import('./install-login/install-login.module').then(m => m.InstallLoginModule) },
  { path: 'login-photourl', loadChildren: () => import('./install-login/install-login.module').then(m => m.InstallLoginModule) }

];
//Learning - if the Primary module lazy loads then it is same as app module
//Learning 101 -> appModule maintains the state. We can use the Main Module to change state for loading lazy modules 
//but we cannot load another lazy module after that, we need to return to the main module.
//My objective L Load module lazyly in the router-outlet and test it. No need for Main Module.
//No point in adding secondary outlets because any way it will increase the initial code size
//Main module is use to set the screen info for the app
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
