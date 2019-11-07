import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoCompleteRoutingModule } from './auto-complete-routing.module';
import { AutoCompleteComponent } from './auto-complete.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule} from '../app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ArrayPushComponent } from './array-push/array-push.component';
import { FirebaseUnionComponent } from './firebase-union/firebase-union.component';

@NgModule({
  declarations: [AutoCompleteComponent, ArrayPushComponent, FirebaseUnionComponent],
  imports: [
    CommonModule,
    AutoCompleteRoutingModule,

    SharedModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule
  ]
})
export class AutoCompleteModule { }
