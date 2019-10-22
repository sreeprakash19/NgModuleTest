import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvSetupRoutingModule } from './env-setup-routing.module';
import { EnvSetupComponent } from './env-setup.component';


@NgModule({
  declarations: [EnvSetupComponent],
  imports: [
    CommonModule,
    EnvSetupRoutingModule
  ]
})
export class EnvSetupModule { }
