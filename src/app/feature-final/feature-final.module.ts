import { NgModule } from '@angular/core';


import { FeatureFinalRoutingModule } from './feature-final-routing.module';
import { FeatureFinalComponent } from './feature-final.component';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import {AppMaterialModule} from '../app-material/app-material.module';

@NgModule({
  declarations: [FeatureFinalComponent],
  imports: [

    
    SharedModule,
    ReactiveFormsModule,
    FeatureFinalRoutingModule,
    AppMaterialModule
  ]
})
export class FeatureFinalModule { }
