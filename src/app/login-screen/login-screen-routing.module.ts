import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginScreenComponent } from './login-screen.component';
import { LoaduserDataComponent } from './components/loaduser-data/loaduser-data.component';
import { LoginUserUpdateComponent } from './components/login-user-update/login-user-update.component';
import { FamilyTraverseComponent } from './components/family-traverse/family-traverse.component';
import { AnimeInitialComponent, Lazy1Component } from './components/anime-initial/anime-initial.component';
import { AnimLoginComponent, Lazy2Component , Lazy3Component} from './components/anim-login/anim-login.component';

const routes: Routes = [{ path: '', component: LoginScreenComponent },
{ path: 'login', component: LoaduserDataComponent },
{ path: 'update', component: LoginUserUpdateComponent },
{ path: 'traverse', component: FamilyTraverseComponent },
{ path: 'animeinitial', component: AnimeInitialComponent,
children: [
  { path: '1', component: Lazy1Component, data: { animation:'intro' } }  
]},
{ path: 'animlogin', component: AnimLoginComponent,
children: [
  { path: '1', component: Lazy2Component, data: { animation:'intro' } },
  { path: '2', component: Lazy3Component, data: { animation:'introleave' } }
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginScreenRoutingModule { }
