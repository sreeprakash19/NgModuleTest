import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstallLoginRoutingModule } from './install-login-routing.module';
import { InstallLoginComponent, BottomSheetExample } from './install-login.component';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule} from '../app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [InstallLoginComponent, BottomSheetExample],
  imports: [
    CommonModule,
    InstallLoginRoutingModule,

    SharedModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule
  ],
  entryComponents: [
    InstallLoginComponent, BottomSheetExample
  ]})
export class InstallLoginModule { }
