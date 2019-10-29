import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamMgtRoutingModule } from './team-mgt-routing.module';
import { TeamMgtComponent } from './team-mgt.component';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule} from '../app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [TeamMgtComponent],
  imports: [
    CommonModule,
    TeamMgtRoutingModule,

    SharedModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule
  ]
})
export class TeamMgtModule { }
