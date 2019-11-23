import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';

import { LoginScreenRoutingModule } from './login-screen-routing.module';
import { LoginScreenComponent, LoginButtonComponent, 
  RetryButtonComponent, UserInfoComponent, OldUserComponent, NewUserComponent } from './login-screen.component';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule} from '../app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoaduserDataComponent, DialogUserLogin } from './components/loaduser-data/loaduser-data.component';
import { LoginUserUpdateComponent } from './components/login-user-update/login-user-update.component';
import { FamilyTraverseComponent } from './components/family-traverse/family-traverse.component';
import { AnimeInitialComponent, Lazy1Component } from './components/anime-initial/anime-initial.component';
import { AnimLoginComponent, Lazy2Component, Lazy3Component } from './components/anim-login/anim-login.component';
import { NewuserTraverseComponent } from './components/newuser-traverse/newuser-traverse.component';
import { ReturnuserTraverseComponent } from './components/returnuser-traverse/returnuser-traverse.component';

@NgModule({
  declarations: [
    LoginScreenComponent, 
    LoginButtonComponent, 
    RetryButtonComponent,
    UserInfoComponent,
    OldUserComponent, 
    NewUserComponent, 
    LoaduserDataComponent, DialogUserLogin, LoginUserUpdateComponent, FamilyTraverseComponent, 
    AnimeInitialComponent, Lazy1Component, AnimLoginComponent, Lazy2Component, Lazy3Component, NewuserTraverseComponent, ReturnuserTraverseComponent
   ],
  imports: [
    //CommonModule,
    LoginScreenRoutingModule,

    SharedModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule
  ],
  entryComponents: [
    LoginScreenComponent, 
    LoginButtonComponent, 
    RetryButtonComponent,
    UserInfoComponent,
    OldUserComponent, 
    NewUserComponent,
    DialogUserLogin
  ]})
export class LoginScreenModule { }
