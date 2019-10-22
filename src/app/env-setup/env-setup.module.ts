import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvSetupRoutingModule } from './env-setup-routing.module';
import { EnvSetupComponent } from './env-setup.component';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule} from '../app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [EnvSetupComponent],
  imports: [
    CommonModule,
    EnvSetupRoutingModule,

    SharedModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule
  ]
})
export class EnvSetupModule { }
