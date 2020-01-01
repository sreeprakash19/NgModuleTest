import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilyPageComponent } from './family-page.component';
import { FamilystartComponent } from './familystart/familystart.component';

const routes: Routes = [
  { path: '', component: FamilyPageComponent },
  { path: 'familypage', component: FamilystartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamilyPageRoutingModule { }
