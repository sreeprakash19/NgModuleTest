import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'feature-start', loadChildren: () => import('./feature-start/feature-start.module').then(m => m.FeatureStartModule) },
  { path: 'feature-final', loadChildren: () => import('./feature-final/feature-final.module').then(m => m.FeatureFinalModule) },
  { path: 'install-login', loadChildren: () => import('./install-login/install-login.module').then(m => m.InstallLoginModule) },
  { path: 'login-fail', loadChildren: () => import('./install-login/install-login.module').then(m => m.InstallLoginModule) },
  { path: 'login-olduser', loadChildren: () => import('./install-login/install-login.module').then(m => m.InstallLoginModule) },
  { path: 'login-retry', loadChildren: () => import('./install-login/install-login.module').then(m => m.InstallLoginModule) },
  { path: 'login-photourl', loadChildren: () => import('./install-login/install-login.module').then(m => m.InstallLoginModule) },
  { path: 'login-photourldialog', loadChildren: () => import('./install-login/install-login.module').then(m => m.InstallLoginModule) },
  { path: 'envstart-menu', loadChildren: () => import('./env-setup/env-setup.module').then(m => m.EnvSetupModule) },
  { path: 'envstart-calc', loadChildren: () => import('./env-setup/env-setup.module').then(m => m.EnvSetupModule) },
  { path: 'fmafstart', loadChildren: () => import('./flex-mat-array-fb/flex-mat-array-fb.module').then(m => m.FlexMatArrayFBModule) },
  { path: 'fmafcontrols', loadChildren: () => import('./flex-mat-array-fb/flex-mat-array-fb.module').then(m => m.FlexMatArrayFBModule) },
  { path: 'fmafgroups', loadChildren: () => import('./flex-mat-array-fb/flex-mat-array-fb.module').then(m => m.FlexMatArrayFBModule) },
  { path: 'fmafvalidation', loadChildren: () => import('./flex-mat-array-fb/flex-mat-array-fb.module').then(m => m.FlexMatArrayFBModule) },
  { path: 'fmafvalues', loadChildren: () => import('./flex-mat-array-fb/flex-mat-array-fb.module').then(m => m.FlexMatArrayFBModule) },
  { path: 'fmafblurfocus', loadChildren: () => import('./flex-mat-array-fb/flex-mat-array-fb.module').then(m => m.FlexMatArrayFBModule) },
  { path: 'fmafreset', loadChildren: () => import('./flex-mat-array-fb/flex-mat-array-fb.module').then(m => m.FlexMatArrayFBModule) },
  { path: 'team-mgt-start', loadChildren: () => import('./team-mgt/team-mgt.module').then(m => m.TeamMgtModule) },
  { path: 'team-mgt-fc', loadChildren: () => import('./team-mgt/team-mgt.module').then(m => m.TeamMgtModule) },
  { path: 'team-mgt-fg', loadChildren: () => import('./team-mgt/team-mgt.module').then(m => m.TeamMgtModule) },
  { path: 'team-mgt-fa', loadChildren: () => import('./team-mgt/team-mgt.module').then(m => m.TeamMgtModule) },
  { path: 'team-mgt-group', loadChildren: () => import('./team-mgt/team-mgt.module').then(m => m.TeamMgtModule) },
  { path: 'team-mgt-control', loadChildren: () => import('./team-mgt/team-mgt.module').then(m => m.TeamMgtModule) },
  
  { path: 'fcarray-start', loadChildren: () => import('./form-control-array/form-control-array.module').then(m => m.FormControlArrayModule) },
  { path: 'fcarray-FormField', loadChildren: () => import('./form-control-array/form-control-array.module').then(m => m.FormControlArrayModule) },
  { path: 'fcarray-inputhint', loadChildren: () => import('./form-control-array/form-control-array.module').then(m => m.FormControlArrayModule) },
  { path: 'fcarray-errstatematch', loadChildren: () => import('./form-control-array/form-control-array.module').then(m => m.FormControlArrayModule) },
  { path: 'fcarray-syncValidator', loadChildren: () => import('./form-control-array/form-control-array.module').then(m => m.FormControlArrayModule) },
  { path: 'fcarray-AsyncValidator', loadChildren: () => import('./form-control-array/form-control-array.module').then(m => m.FormControlArrayModule) },
  { path: 'fcarray-materror', loadChildren: () => import('./form-control-array/form-control-array.module').then(m => m.FormControlArrayModule) }
  
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
