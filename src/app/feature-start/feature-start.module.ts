import { NgModule } from '@angular/core';

import { FeatureStartRoutingModule } from './feature-start-routing.module';
import { FeatureStartComponent } from './feature-start.component';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import {AppMaterialModule} from '../app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [FeatureStartComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FeatureStartRoutingModule,
    AppMaterialModule,
    FlexLayoutModule
  ]
})
export class FeatureStartModule { }
