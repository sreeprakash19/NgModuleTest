import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
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
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface UserInfo {
  AnniversaryDate: string;
  BirthDate: string;
  City: string;
  displayName: string;
  email: string;
  myCustomData: string;
  photoURL: string;
  PhoneNumber: string;
  GiftsBank: number;
  verifiedemail: boolean;
  Gender: string;
}

export interface UserInfoLogin extends UserInfo {
  profileimage: string;
  NewOrOldUser: boolean;
  uid: string;
  displayedTitle: string;
}

@Component({
  selector: 'app-install-login',
  templateUrl: './install-login.component.html',
  styleUrls: ['./install-login.component.css']
})
export class InstallLoginComponent implements OnInit, OnDestroy {
  showspinner = false;
  showretry = false;
  retryoption = 'Retry Login';
  private itemDoc: AngularFirestoreDocument<UserInfo>;
  item: UserInfo;
  saveData: UserInfo = {
    AnniversaryDate: 'Update!',
    BirthDate: 'Update!',
    City: 'Update!',
    displayName: '',
    email: '',
    myCustomData: 'Update!',
    photoURL: '',
    PhoneNumber: '',
    GiftsBank: 0,
    verifiedemail: false,
    Gender: 'unknown'
  };

  //fail
  showLoginphotourl= true;

  constructor(private db: AngularFirestore, public svc: UserService,
              public afAuth: AngularFireAuth, private ref: ChangeDetectorRef,
              private dialog: MatDialog) {
    
  }


  ngOnInit() {
    this.svc.footerdisplay = `
    In app.module.ts add - import {MatCardModule} from '@angular/material/card';
    in NgModule - MatCardModule

    1. loginPass- User logs in and login is success
    2. loginFail- User logs in and closes the popup and retry is shown
    3. login retry pass: User Logs in success after retry
    4. login photourlsave: After successfull login save the uid and photoURL
    `;
    this.logout();
    this.svc.sidebardisplay = ``;
    this.svc.resultdisplay = `
    Before Test
    showspinner= ${this.showspinner}
    showretry =  ${this.showretry}
    retryoption= ${this.retryoption}
    `;
  }
  docExists(uid: string) {
    return this.db.doc(`user/${uid}`).valueChanges().pipe(first()).toPromise();
  }
  docExistsOld(uid: string) {
    return this.db.doc(`users/${uid}`).valueChanges().pipe(first()).toPromise();
  }
  async findOrCreateOld(uid: string) {
    const doc = await this.docExistsOld(uid);

    if (doc) {
      ////await this.db.doc(`users/${uid}`).valueChanges().pipe(first()).subscribe((success: UserInfo) => {
      //});
      return 'doc exists';
    } else {

      //await this.db.doc(`users/${uid}`).set(data);
      return 'created new doc';
    }
  }
  async findOrCreate(uid: string) {
    const doc = await this.docExists(uid);

    if (doc) {
      ////await this.db.doc(`users/${uid}`).valueChanges().pipe(first()).subscribe((success: UserInfo) => {
      //});
      return 'doc exists';
    } else {

      //await this.db.doc(`users/${uid}`).set(data);
      return 'created new doc';
    }
  }
  GoogleLogin() {
    this.showretry = true;
    this.showspinner = true;
    this.ref.detectChanges();


    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(successLogin => {
      this.itemDoc = this.db.doc<UserInfo>(`user/${successLogin.user.uid}`);
      if (successLogin != null) {
        this.showretry = false;
        this.showspinner = false;

        this.findOrCreate(successLogin.user.uid).then(result => {
          if( result != null) {

            if (result !== 'created new doc') {//old user
              this.itemDoc.valueChanges().pipe(first()).toPromise().then( dbuser => {
                this.saveData = dbuser;
                this.svc.footerdisplay = JSON.stringify(dbuser, undefined, 4);
                const sendSaveData: UserInfoLogin = {
                  NewOrOldUser: false, uid: successLogin.user.uid, profileimage: dbuser.myCustomData,
                  displayedTitle: successLogin.user.displayName, ...this.saveData
                };
                this.svc.sidebardisplay = `Old User`;
                console.log('Old User get data from db:', sendSaveData);
              });

            } else
            {
              this.saveData.displayName = successLogin.user.displayName;
              this.saveData.email = successLogin.user.email;
              this.saveData.photoURL = successLogin.user.photoURL;
              this.saveData.PhoneNumber = successLogin.user.phoneNumber;
              this.saveData.verifiedemail = successLogin.user.emailVerified;
              const sendSaveData: UserInfoLogin = {
                NewOrOldUser: true, uid: successLogin.user.uid, profileimage: successLogin.user.photoURL,
                displayedTitle: successLogin.user.displayName, ...this.saveData
              };
              this.svc.footerdisplay = JSON.stringify(sendSaveData, undefined, 4);
              this.svc.sidebardisplay = `New User`;
              console.log('New User save in db:', sendSaveData);
              
            }
          } 

        });

        //console.log('Save PhotoURl', successLogin.user.photoURL);
        //close mat-dialog & update the avatar in toolbar
        //saved photoURL in DB
        //update menubar options
        //this.svc.footerdisplay = JSON.stringify(successLogin.user, undefined, 4);
        this.svc.moredisplay =  `
        After Test
        showspinner= ${this.showspinner}
        showretry =  ${this.showretry}
        retryoption= ${this.retryoption}
        `;


      }
    }).catch(error => {
      console.log('Error:', error);
      this.showspinner = false;
      this.ref.detectChanges();

    });
  }
  Googleolduser(){
    this.showretry = true;
    this.showspinner = true;
    this.ref.detectChanges();


    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(successLogin => {
      this.itemDoc = this.db.doc<UserInfo>(`users/${successLogin.user.uid}`);
      if (successLogin != null) {
        this.showretry = false;
        this.showspinner = false;

        this.findOrCreateOld(successLogin.user.uid).then(result => {
          if( result != null) {

            if (result !== 'created new doc') {//old user
              this.itemDoc.valueChanges().pipe(first()).toPromise().then( dbuser => {
                this.saveData = dbuser;
                this.svc.footerdisplay = JSON.stringify(dbuser, undefined, 4);
                const sendSaveData: UserInfoLogin = {
                  NewOrOldUser: false, uid: successLogin.user.uid, profileimage: dbuser.myCustomData,
                  displayedTitle: successLogin.user.displayName, ...this.saveData
                };
                this.svc.sidebardisplay = `Old User`;
                console.log('Old User get data from db:', sendSaveData);
              });

            } else
            {
              this.saveData.displayName = successLogin.user.displayName;
              this.saveData.email = successLogin.user.email;
              this.saveData.photoURL = successLogin.user.photoURL;
              this.saveData.PhoneNumber = successLogin.user.phoneNumber;
              this.saveData.verifiedemail = successLogin.user.emailVerified;
              const sendSaveData: UserInfoLogin = {
                NewOrOldUser: true, uid: successLogin.user.uid, profileimage: successLogin.user.photoURL,
                displayedTitle: successLogin.user.displayName, ...this.saveData
              };
              this.svc.footerdisplay = JSON.stringify(sendSaveData, undefined, 4);
              this.svc.sidebardisplay = `New User`;
              console.log('New User save in db:', sendSaveData);
              
            }
          } 

        });

        //console.log('Save PhotoURl', successLogin.user.photoURL);
        //close mat-dialog & update the avatar in toolbar
        //saved photoURL in DB
        //update menubar options
        //this.svc.footerdisplay = JSON.stringify(successLogin.user, undefined, 4);
        this.svc.moredisplay =  `
        After Test
        showspinner= ${this.showspinner}
        showretry =  ${this.showretry}
        retryoption= ${this.retryoption}
        `;


      }
    }).catch(error => {
      console.log('Error:', error);
      this.showspinner = false;
      this.ref.detectChanges();

    });
  }

  GoogleLoginFail() {
    this.showretry = true;
    this.showspinner = true;

    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(successLogin => {
      if(successLogin != null){
        this.showspinner = false;
        this.showretry = false;
        this.svc.footerdisplay = `Fail`;
        this.svc.sidebardisplay = `TC Failed`;
        this.svc.moredisplay =  `
        After Test
        showspinner= ${this.showspinner}
        showretry =  ${this.showretry}
        retryoption= ${this.retryoption}
        `;

      }
    }).catch(error => {
      this.svc.sidebardisplay = `TC Pass`;
      this.svc.footerdisplay = JSON.stringify(error, undefined, 4);

      this.showspinner = false;

      this.svc.moredisplay =  `
      After Test
      showspinner= ${this.showspinner}
      showretry =  ${this.showretry}
      retryoption= ${this.retryoption}
      `;

    });
  }

  GoogleLoginRetry() {
    this.showretry = true;
    this.showspinner = true;
    const provider = new auth.GoogleAuthProvider();

    this.afAuth.auth.signInWithPopup(provider).then(successLogin => {
      if (successLogin != null) {
        this.showretry = false;
        this.showspinner = true;
        this.svc.footerdisplay = `
        Login Retry: Success after the Retry.
        `;
        this.svc.moredisplay =  `
        After Test
        showspinner= ${this.showspinner}
        showretry =  ${this.showretry}
        retryoption= ${this.retryoption}
        `;
      }
    }).catch(error => {
      this.svc.sidebardisplay = `TC Rery Fail`;
      this.svc.footerdisplay = JSON.stringify(error, undefined, 4);

      this.showspinner = false;

      this.svc.moredisplay =  `
      After Test
      showspinner= ${this.showspinner}
      showretry =  ${this.showretry}
      retryoption= ${this.retryoption}
      `;

    });
  }

  GoogleLoginPhotoUrl() { 
    this.showretry = true;
    this.showspinner = true;
    this.ref.detectChanges();


    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(successLogin => {
      
      if (successLogin != null) {
        this.showretry = false;
        this.showspinner = false;
        

        this.findOrCreate(successLogin.user.uid).then(result => {
          if( result != null) {

            if (result !== 'created new doc') {//old user
              this.itemDoc.valueChanges().pipe(first()).toPromise().then( dbuser => {
                this.saveData = dbuser;
                this.svc.footerdisplay = JSON.stringify(dbuser, undefined, 4);
                const sendSaveData: UserInfoLogin = {
                  NewOrOldUser: false, uid: successLogin.user.uid, profileimage: dbuser.myCustomData, 
                  displayedTitle:dbuser.displayName,  ...this.saveData
                };
                this.svc.sidebardisplay = `Old User`;
                console.log('Old User get data from db:', sendSaveData);
              });

            } else
            {//new user
              this.saveData.displayName = successLogin.user.displayName;
              this.saveData.email = successLogin.user.email;
              this.saveData.photoURL = successLogin.user.photoURL;
              this.saveData.PhoneNumber = successLogin.user.phoneNumber;
              this.saveData.verifiedemail = successLogin.user.emailVerified;
              const sendSaveData: UserInfoLogin = {
                NewOrOldUser: true, uid: successLogin.user.uid, profileimage: successLogin.user.photoURL,
                displayedTitle: successLogin.user.displayName, ...this.saveData
              };
              this.itemDoc = this.db.doc<UserInfo>(`user/${successLogin.user.uid}`);
              this.itemDoc.set(this.saveData).then( myresult => {
                console.log('DB', myresult);
              }); //save the new user in db
              this.svc.footerdisplay = JSON.stringify(this.saveData, undefined, 4);
              this.svc.sidebardisplay = `New User`;
            }
          } 

        });


        //update menubar options
        //this.svc.footerdisplay = JSON.stringify(successLogin.user, undefined, 4);
        this.svc.moredisplay =  `
        After Test
        showspinner= ${this.showspinner}
        showretry =  ${this.showretry}
        retryoption= ${this.retryoption}
        `;


      }
    }).catch(error => {
      console.log('Error:', error);
      this.showspinner = false;
      this.ref.detectChanges();

    });
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }
  GoogleLogindialog() {

  }
  logout() {
    this.afAuth.auth.signOut().then(successLogin => {
      if (successLogin != null) {
        this.showspinner = false;
        this.ref.detectChanges();
        // update the avatar in toolbar
        //update menubar options
      }
    });
  }

  ngOnDestroy() {
    this.afAuth.auth.signOut();
  }
}
