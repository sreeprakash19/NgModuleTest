import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamMgtComponent } from './team-mgt.component';

const routes: Routes = [{ path: '', component: TeamMgtComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamMgtRoutingModule { }
