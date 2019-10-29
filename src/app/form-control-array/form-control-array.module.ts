import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControlArrayRoutingModule } from './form-control-array-routing.module';
import { FormControlArrayComponent } from './form-control-array.component';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule} from '../app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [FormControlArrayComponent],
  imports: [
    CommonModule,
    FormControlArrayRoutingModule,

    SharedModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule
  ]
})
export class FormControlArrayModule { }
