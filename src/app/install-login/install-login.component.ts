import { Component, OnInit, OnDestroy, TemplateRef, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestoreDocument,
  AngularFirestore
} from '@angular/fire/firestore';

import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';

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
  showspinnerphotourl = false;
  showretryphotourl = false;
  retryoptionphotourl= 'Google Login';

//Dialog
  @ViewChild('showLoginphotourldialog', { static: true }) spinDialog: TemplateRef<any>;
  showspinnerphotourldialog= true;

   constructor(public svc: UserService, public afAuth: AngularFireAuth, private ref: ChangeDetectorRef, private dialog: MatDialog) {

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
    this.logout();
  }

  GoogleLogin(){
    this.showretry = true;
    this.showspinner= true;
    this.ref.detectChanges();
    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(successLogin => {
      if(successLogin != null){
        this.showretry = false;
        this.showspinner= false;
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

  GoogleLoginFail(){
    this.logout();
    this.svc.footerdisplay= `
    Login Fail case
    `;
    this.showretry = true;
    this.showspinner= true;
    this.ref.detectChanges();
    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(successLogin => {
      if(successLogin != null){
        //console.log('Save PhotoURl', successLogin.user.photoURL);
        //close mat-dialog & update the avatar in toolbar
        //saved photoURL in DB
        //update menubar options

      }
    }).catch(error => {
      console.log('Error:', error);
      this.showspinner= false;

      this.svc.footerdisplay= `
      Login Fail: displays the Retry atonce
      `;
      this.ref.detectChanges();

    });
  }

  GoogleLoginRetry(){
    //this.svc.footerdisplay= `
    //Login Fail case
    //`;
    this.showretry = true;
    this.showspinner= true;
    const provider = new auth.GoogleAuthProvider();
    this.ref.detectChanges();
    this.afAuth.auth.signInWithPopup(provider).then(successLogin => {
      if(successLogin != null){
        this.showretry = false;
        this.showspinner= true;
        this.svc.footerdisplay= `
        Login Retry: Success after the Retry.
        `;
        this.ref.detectChanges();
        //console.log('Save PhotoURl', successLogin.user.photoURL);
        //close mat-dialog & update the avatar in toolbar
        //saved photoURL in DB
        //update menubar options

      }
    }).catch(error => {
      console.log('Error:', error);
      this.showspinner= false;
      this.svc.footerdisplay= `
      Login Fail: displays the Retry atonce
      `;
      this.ref.detectChanges();

    });
  }

  GoogleLoginPhotoUrl(){
    
    this.svc.footerdisplay= `
    Login photoURL: Login Success and save URL in DB
    `;
    this.showretryphotourl = true;
    this.showspinnerphotourl= true;
    this.ref.detectChanges();
    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(successLogin => {
      if(successLogin != null){
        
        this.retryoptionphotourl  = 'Success';
        this.showretryphotourl = false;
        this.showspinnerphotourl= false;
        this.ref.detectChanges();
        this.svc.footerdisplay= JSON.stringify(successLogin.user,  undefined, 4);
        //console.log('Save PhotoURl', successLogin.user.photoURL);
        //close mat-dialog & update the avatar in toolbar
        //saved photoURL in DB
        //update menubar options

      }
    }).catch(error => {
      
      this.retryoptionphotourl = 'Retry Login';
      this.showretryphotourl = false;
      this.showspinnerphotourl= false;
      this.svc.footerdisplay= `
      Login Fail: displays the Retry
      `;
      this.ref.detectChanges();
      

    });
  }

  GoogleLogindialog(){
    

    https://dzone.com/articles/how-to-upgrade-angular-packagesenable-ivy-compiler
    this.svc.footerdisplay= `
    Login photoURL: Login Success and save URL in DB
    `;
    this.showretryphotourl = true;
    this.showspinnerphotourl= true;
    this.ref.detectChanges();
    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(successLogin => {
      if(successLogin != null){
        
        this.retryoptionphotourl  = 'Success';
        this.showretryphotourl = false;
        this.showspinnerphotourl= false;
        this.ref.detectChanges();
        this.svc.footerdisplay= JSON.stringify(successLogin.user,  undefined, 4);
        //console.log('Save PhotoURl', successLogin.user.photoURL);
        //close mat-dialog & update the avatar in toolbar
        //saved photoURL in DB
        //update menubar options

      }
    }).catch(error => {
      
      this.retryoptionphotourl = 'Retry Login';
      this.showretryphotourl = false;
      this.showspinnerphotourl= false;
      this.svc.footerdisplay= `
      Login Fail: displays the Retry
      `;
      this.ref.detectChanges();
      

    }); 
  }
  logout() {
    this.afAuth.auth.signOut().then(successLogin => {
      if(successLogin != null){
        this.showspinner= false;
        this.ref.detectChanges();
        // update the avatar in toolbar
        //update menubar options
      }
  });
}

ngOnDestroy(){
  this.afAuth.auth.signOut();
}
}
