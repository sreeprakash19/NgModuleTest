import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexMatArrayFBRoutingModule } from './flex-mat-array-fb-routing.module';
import { FlexMatArrayFBComponent } from './flex-mat-array-fb.component';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule} from '../app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [FlexMatArrayFBComponent],
  imports: [
    CommonModule,
    FlexMatArrayFBRoutingModule,

    SharedModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule

  ]
})
export class FlexMatArrayFBModule { }
