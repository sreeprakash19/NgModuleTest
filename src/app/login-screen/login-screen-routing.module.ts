import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginScreenComponent } from './login-screen.component';
import { LoaduserDataComponent } from './components/loaduser-data/loaduser-data.component';
const routes: Routes = [{ path: '', component: LoginScreenComponent },
{ path: 'login', component: LoaduserDataComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginScreenRoutingModule { }
