import { NgModule } from '@angular/core';

import { FeatureStartRoutingModule } from './feature-start-routing.module';
import { FeatureStartComponent } from './feature-start.component';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import {AppMaterialModule} from '../app-material/app-material.module';

@NgModule({
  declarations: [FeatureStartComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FeatureStartRoutingModule,
    AppMaterialModule
  ]
})
export class FeatureStartModule { }
