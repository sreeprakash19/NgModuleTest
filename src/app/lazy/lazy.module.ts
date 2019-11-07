import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyRoutingModule } from './lazy-routing.module';
import { LazyComponent } from './lazy.component';
import { Lazy1Component } from './lazy1.component';


@NgModule({
  declarations: [LazyComponent, Lazy1Component],
  imports: [
    CommonModule,
    LazyRoutingModule
  ]
})
export class LazyModule { }
