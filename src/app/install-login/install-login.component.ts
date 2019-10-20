import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestoreDocument,
  AngularFirestore
} from '@angular/fire/firestore';

import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-install-login',
  templateUrl: './install-login.component.html',
  styleUrls: ['./install-login.component.css']
})
export class InstallLoginComponent implements OnInit, OnDestroy {
  showspinner= false;
  showretry =  false;
  retryoption= 'Retry Login';

//photourl
  retryoption_photourl= 'Google Login';
   constructor(public svc: UserService, public afAuth: AngularFireAuth, private ref: ChangeDetectorRef) {

   }

  ngOnInit() {
    this.svc.footerdisplay= `
    In app.module.ts add - import {MatCardModule} from '@angular/material/card';
    in NgModule - MatCardModule

    1. loginPass- User logs in and login is success
    2. loginFail- User logs in and closes the popup and retry is shown
    3. login retry pass: User Logs in success after retry
    4. login photourlsave: After successfull login save the uid and photoURL
    `;
  }

  GoogleLogin(){
    this.showretry = true;
    this.showspinner= true;
    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(successLogin => {
      if(successLogin != null){
        this.showretry = false;
        this.showspinner= false;
        this.retryoption= 'Login success';
        //console.log('Save PhotoURl', successLogin.user.photoURL);
        //close mat-dialog & update the avatar in toolbar
        //saved photoURL in DB
        //update menubar options
        this.svc.footerdisplay= `
        Login Success
        `;
      }
    }).catch(error => {
      console.log('Error:', error);
      this.showspinner= false;
      this.ref.detectChanges();

    });
  }


  logout() {
    this.afAuth.auth.signOut().then(successLogin => {
      if(successLogin != null){
        this.showspinner= false;
        // update the avatar in toolbar
        //update menubar options
      }
  });
}

ngOnDestroy(){
  this.afAuth.auth.signOut();
}
}
