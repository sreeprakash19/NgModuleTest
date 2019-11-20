import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {
  loginButtonRef: any;
  retrySpinnerRef: any;
  showretry = false;
  constructor(public svc: UserService, private bottomSheet: MatBottomSheet, 
              private ref: ChangeDetectorRef, public afAuth: AngularFireAuth ) {
              }

  ngOnInit() {    
    this.GoogleLogout();
    if (this.svc.hellotext === '') {
      this.svc.footerdisplay = `
      `;
      this.svc.sidebardisplay = ``;
      this.svc.resultdisplay = `
      `;
      this.svc.moredisplay = `
      `;
    }
    if (this.svc.hellotext === 'loginscreen-start') {
    }
  }

  GoogleLogin() {
    this.retrySpinnerRef = this.bottomSheet.open(LoginButtonComponent, {disableClose: true});
    this.retrySpinnerRef.afterDismissed().subscribe(() => {
      console.log('Bottom sheet has been dismissed.');
    });
    //this.svc.onLoginGoogle();
  }
  GoogleLogout(){
    this.afAuth.auth.signOut();
  }
}

@Component({
  selector: 'app-login-button',
  template: `
  <div *ngIf="!showspinner" fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="10%">

    <button mat-raised-button *ngIf="showlogin" color="primary" (click)="GoogleLogin()">
        Google login
    </button>
    <button mat-raised-button *ngIf="shownewUser" color="primary" (click)="NewUserContinue()">
      New User
    </button>
    <button mat-raised-button *ngIf="showoldUser" color="primary" (click)="OldUserContinue()">
      Old login
    </button>
    <button mat-raised-button *ngIf="showretry" color="primary" (click)="GoogleLogin()">
      Retry Login
    </button>
    <button mat-raised-button *ngIf="showlogin" color="primary" (click)="closeBottom()">
      Close B.Sheet
    </button>
  </div>
  <div *ngIf="showspinner" fxLayout="column" fxLayoutAlign="space-around center" 
        style="height: auto; margin: 10%; padding:10%; overflow: hidden;">
    <mat-spinner ></mat-spinner>
  </div>
  `
})
export class LoginButtonComponent implements OnInit {
  showspinner = false;
  showlogin = true;
  showretry = false;
  shownewUser = false;
  showoldUser = false;

  constructor(private bottomSheetRef: MatBottomSheetRef<LoginButtonComponent>, private ref: ChangeDetectorRef,
              public afAuth: AngularFireAuth, private afs: AngularFirestore, public dialog: MatDialog,
              private bottomSheet: MatBottomSheet, private _snackBar: MatSnackBar) {
      
  }
  ngOnInit() {
    //this.showspinner= true;
  }
  docExists(uid: string) {
    return this.afs.doc(`UsersData/${uid}`).valueChanges().pipe(first()).toPromise();
  }
  async findOrCreate(uid: string) {
    const doc = await this.docExists(uid);
    console.log('doc', doc);
    
    if (doc) {
      return 'doc exists';
    } else {
      return 'created new doc';
    }
  }
  GoogleLogin() {
    this.showspinner = true;
    this.showlogin = true;
    this.showretry = false;

    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(successLogin =>{
      this.findOrCreate(successLogin.user.uid).then(result => {
        if( result != null) {
          if (result === 'created new doc') { 
            this.ref.markForCheck();
            this.showspinner = false;
            this.showlogin = false;
            this.shownewUser = true;
            this.ref.detectChanges();
          } else {
            this.ref.markForCheck();
            this.showspinner = false;
            this.showlogin = false;
            this.showoldUser = true;
            this.ref.detectChanges();
          }
        }
      });
    }).catch(error => {
      this.ref.markForCheck();
      this.showspinner = false;
      this.showlogin = false;
      this.showretry = true;
      this.ref.detectChanges();
    });
  }
  NewUserContinue(){
    /*this._snackBar.openFromComponent(NewUserComponent, {
      duration: 500,
    });
    
    this.bottomSheet.open(OldUserComponent);
    this.bottomSheetRef.dismiss();*/

    this.dialog.open(UserInfoComponent, {
      width: '250px'});  
      this.bottomSheetRef.dismiss();
  }
  OldUserContinue(){
    //this.bottomsheetref= this.bottomSheet.open(MySheetComponent);
    /*this._snackBar.openFromComponent(MySheetComponent, {
      duration: 10000,
    });*/

    //this.bottomsheetref= this.bottomSheet.open(MySheetComponent, {disableClose: false});  
    /*this.dialog.open(UserInfoComponent, {
        width: '250px'});  */
        //this.bottomSheet.open(UserInfoComponent, {disableclose: false});
        this.dialog.open(UserInfoComponent, {
          width: '250px'});  
          this.bottomSheetRef.dismiss();
  }

  bottomsheetopen(){
    //this.bottomsheetref= this.bottomSheet.open(MySheetComponent, {disableClose: false});
    this.dialog.open(UserInfoComponent, {
      width: '250px'});  
  }

  bottomsheetclose(){
    //this.bottomsheetref.dismiss();
    /*this._snackBar.openFromComponent(MySheetComponent, {
      duration: 500,
    });*/
  }

  closeBottom(){
    this.bottomSheetRef.dismiss();
  }
}

@Component({
  selector: 'app-user-info',
  template: `
  <mat-card fxFlex="50%" [style.backgroundColor]="'cyan'" *ngIf="showretry">
    <mat-card-header>
        <mat-card-title>Logging into Google Account</mat-card-title>
    </mat-card-header>

    <mat-card-content fxLayout="column">
       <button mat-raised-button (click)="closeDialog()"> Close </button>
    </mat-card-content>
  </mat-card>
  `
})
export class UserInfoComponent {
  showretry = true;
  constructor(public dialogRef: MatDialogRef<UserInfoComponent>) {
  }
    closeDialog() {
    this.dialogRef.close();
  }
}
@Component({
  selector: 'app-retry-button',
  template: `
  <mat-card fxFlex="50%" [style.backgroundColor]="'cyan'" *ngIf="showretry">
    <mat-card-header>
        <mat-card-title>Logging into Google Account</mat-card-title>
    </mat-card-header>

    <mat-card-content fxLayout="column">
        <mat-spinner *ngIf="showspinner"></mat-spinner>

        <button mat-raised-button *ngIf="!showspinner" color="primary" (click)="GoogleLogin()">
            {{retryoption}}</button>
    </mat-card-content>
  </mat-card>
  `
})
export class RetryButtonComponent {
  showspinner = false;
  showretry = true;
  retryoption = 'Retry Login';
  constructor(private _bottomSheetRef: MatBottomSheetRef<RetryButtonComponent>) {

  }
  GoogleLogin() {
    this._bottomSheetRef.dismiss();

  }

}


@Component({
  selector: 'old-user-component-snack',
  template: `
  <span class="example-pizza-party">
    Old User!!! 🍕
    <button (click) = "closeme()"> close</button>
  </span>
  `,
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class OldUserComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<OldUserComponent>){

  }

  closeme(){
    this._bottomSheetRef.dismiss();
  }
}

@Component({
  selector: 'new-user-component-snack',
  template: `
  <span class="example-pizza-party">
    Old User!!! 🍕
  </span>
  `,
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class NewUserComponent {}

//Learnings
//1. dialog can be open from the bottom sheet
//2. Another bottom sheet cannot be opened from a bottomsheet
//3. snackbar can be opened from a component not from a bottomsheet
