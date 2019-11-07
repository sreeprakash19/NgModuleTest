import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoCompleteComponent } from './auto-complete.component';
import { ArrayPushComponent } from './array-push/array-push.component';
import { FirebaseUnionComponent } from './firebase-union/firebase-union.component';


const routes: Routes = [{ path: '', component: FirebaseUnionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoCompleteRoutingModule { }
