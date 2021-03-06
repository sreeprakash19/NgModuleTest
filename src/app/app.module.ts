import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CustomerDashboardModule } from './customer-dashboard/customer-dashboard.module';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import {AppMaterialModule} from './app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,

    FlexLayoutModule,
    AppMaterialModule,
    ReactiveFormsModule,
    CustomerDashboardModule,
    HttpClientModule,

    AngularFireModule.initializeApp(environment.firebase),
    //AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
