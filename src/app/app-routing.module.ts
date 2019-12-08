import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  
  /*
  { path: 'feature-start', loadChildren: () => import('./feature-start/feature-start.module').then(m => m.FeatureStartModule) },
  { path: 'feature-final', loadChildren: () => import('./feature-final/feature-final.module').then(m => m.FeatureFinalModule) },
  { path: 'install-login', loadChildren: () => import('./install-login/install-login.module').then(m => m.InstallLoginModule) },
  { path: 'login-fail', loadChildren: () => import('./install-login/install-login.module').then(m => m.InstallLoginModule) },
  { path: 'login-olduser', loadChildren: () => import('./install-login/install-login.module').then(m => m.InstallLoginModule) },
  { path: 'login-retry', loadChildren: () => import('./install-login/install-login.module').then(m => m.InstallLoginModule) },
  { path: 'login-photourl', loadChildren: () => import('./install-login/install-login.module').then(m => m.InstallLoginModule) },
  { path: 'login-photourldialog', loadChildren: () => import('./install-login/install-login.module').then(m => m.InstallLoginModule) },
  { path: 'login-DBNewUser', loadChildren: () => import('./install-login/install-login.module').then(m => m.InstallLoginModule) },
  { path: 'login-DBReadUser', loadChildren: () => import('./install-login/install-login.module').then(m => m.InstallLoginModule) },
  { path: 'login-Profilescr', loadChildren: () => import('./install-login/install-login.module').then(m => m.InstallLoginModule) },
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
  { path: 'fcarray-materror', loadChildren: () => import('./form-control-array/form-control-array.module').then(m => m.FormControlArrayModule) },
  { path: 'fcarray-localarray', loadChildren: () => import('./form-control-array/form-control-array.module').then(m => m.FormControlArrayModule) },
  { path: 'fcarray-firestoreArray', loadChildren: () => import('./form-control-array/form-control-array.module').then(m => m.FormControlArrayModule) },
  { path: 'fcarray-firestoreControl', loadChildren: () => import('./form-control-array/form-control-array.module').then(m => m.FormControlArrayModule) },
  { path: 'fcarray-select', loadChildren: () => import('./form-control-array/form-control-array.module').then(m => m.FormControlArrayModule) },
  { path: 'feature-autocomplete', loadChildren: () => import('./auto-complete/auto-complete.module').then(m => m.AutoCompleteModule) },
  { path: 'autocomplete-localArray', loadChildren: () => import('./auto-complete/auto-complete.module').then(m => m.AutoCompleteModule) },
  { path: 'main-page', loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule), data: {animation: 'StartPage'} },
  { path: 'ref-aray', loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule) },
  { path: 'ref-friends', loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule) },
  { path: 'claim-array', loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule) },
  { path: 'fn-array', loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule) },
  { path: 'link-req', loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule) },
  { path: 'claim-settings', loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule) },
  { path: 'search-settings', loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule) },
  { path: 'sc-write', loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule) },
  { path: 'sc-read', loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule) },
  { path: 'sc-writearray', loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule) },
  { path: 'sc-queryarray', loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule) },
  { path: 'login-screen', loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule) },

  { path: 'lazy', loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule) },
  { path: 'loginscreen-start', loadChildren: () => import('./login-screen/login-screen.module').then(m => m.LoginScreenModule) },*/
  { path: 'audio-final', loadChildren: () => import('./audio-final/audio-final.module').then(m => m.AudioFinalModule) },
  { path: '**', redirectTo: '' , pathMatch: 'full'}

  
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
