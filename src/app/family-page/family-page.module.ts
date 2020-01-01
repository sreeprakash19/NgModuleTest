import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule} from '../app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FamilyPageRoutingModule } from './family-page-routing.module';
import { FamilyPageComponent } from './family-page.component';
import { FamilystartComponent } from './familystart/familystart.component';


@NgModule({
  declarations: [FamilyPageComponent, FamilystartComponent],
  imports: [

    FamilyPageRoutingModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule
  ]
})
export class FamilyPageModule { }
