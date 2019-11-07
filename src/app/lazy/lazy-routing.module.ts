import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LazyComponent } from './lazy.component';
import { Lazy1Component } from './lazy1.component';
const routes: Routes = [
  {
    path: '', component: LazyComponent,
    children: [
      { path: '1', component: Lazy1Component, data: { state: 'lazy1' } }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyRoutingModule { }
