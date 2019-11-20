import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginScreenRoutingModule } from './login-screen-routing.module';
import { LoginScreenComponent, LoginButtonComponent, 
  RetryButtonComponent, UserInfoComponent, OldUserComponent, NewUserComponent } from './login-screen.component';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule} from '../app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoaduserDataComponent, DialogUserLogin } from './components/loaduser-data/loaduser-data.component';

@NgModule({
  declarations: [
    LoginScreenComponent, 
    LoginButtonComponent, 
    RetryButtonComponent,
    UserInfoComponent,
    OldUserComponent, 
    NewUserComponent, 
    LoaduserDataComponent, DialogUserLogin
   ],
  imports: [
    CommonModule,
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
