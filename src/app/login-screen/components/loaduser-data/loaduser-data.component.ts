import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../../user.service';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import {
  AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors,
  FormControl, FormArray, FormGroupDirective, NgForm, ValidatorFn
} from '@angular/forms';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

export interface DialogData {
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
}
export interface MyUserData {
  profileData: Array<DialogData>;
}

@Component({
  selector: 'app-loaduser-data',
  templateUrl: './loaduser-data.component.html',
  styleUrls: ['./loaduser-data.component.css']
})
export class LoaduserDataComponent implements OnInit {

  demoForm = this.formBuilder.group({
    profileData: this.formBuilder.array([])
  });
  showspinner = false;
  showlogin = true;
  shownewUser = false;
  showoldUser = false;
  showretry = false;
  private itemDoc: AngularFirestoreDocument<MyUserData>;
  somedata: Observable<MyUserData>;
  savedData: MyUserData;
  singleData: DialogData;
  MultipleData :  Array<DialogData>;
  constructor(public svc: UserService, public afAuth: AngularFireAuth, private afs: AngularFirestore,
    public dialog: MatDialog, public formBuilder: FormBuilder) {
    this.GoogleLogout();
  }

  ngOnInit() {
  }

  docExists(uid: string) {
    return this.afs.doc(`testcollection/${uid}`).valueChanges().pipe(first()).toPromise();
  }
  async findOrCreate(uid: string) {

    const doc = await this.docExists(uid);

    if (doc) {
      this.itemDoc = this.afs.doc<MyUserData>(`testcollection/${uid}`);
      this.somedata = this.itemDoc.valueChanges();

      this.somedata.subscribe(v => {
        v.profileData.map(mydata => {
          const employeeFormGroups = v.profileData.map(details => this.formBuilder.group(details));
          const employeeFormArray = this.formBuilder.array(employeeFormGroups);
          this.demoForm.setControl('profileData', employeeFormArray);
          this.demoForm.get('profileData').patchValue(v.profileData);
          this.MultipleData = v.profileData;
          this.singleData = v.profileData[0];
        });

      });

      return 'doc exists';
    } else {
      return 'created new doc';
    }
  }

  GoogleLogin() {
    this.showspinner = true;

    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(successLogin => {
      this.findOrCreate(successLogin.user.uid).then(result => {

        if (result != null) {
          if (result === 'created new doc') { //new
            // this.ref.markForCheck();
            this.showspinner = false;
            this.showlogin = false;
            this.shownewUser = true;
            //this.ref.detectChanges();
          } else {//old
            //this.ref.markForCheck();
            this.showspinner = false;
            this.showlogin = false;
            this.showoldUser = true;


            //this.ref.detectChanges();
          }
        }
      });
    }).catch(error => {
      //this.ref.markForCheck();
      this.showspinner = false;
      this.showlogin = false;
      this.showretry = true;
      //this.ref.detectChanges();
    });
  }
  GoogleLogout() {
    this.afAuth.auth.signOut();
  }
  OldUserContinue() {
    const dialogRef = this.dialog.open(DialogUserLogin, {
      width: '250px', data: this.singleData
    });
    dialogRef.afterClosed().subscribe(result  => {
      console.log('The dialog was closed');

      this.singleData = result;
      this.MultipleData[0] = result;
      const profileFormGroups = this.MultipleData.map(details => this.formBuilder.group(details));
      const profileFormArray = this.formBuilder.array(profileFormGroups);
      this.demoForm.setControl('profileData', profileFormArray);
      this.demoForm.get('profileData').patchValue(this.MultipleData);
      console.log('Saved Values:',this.demoForm.value);
      this.itemDoc.update(this.demoForm.value);
    });
  }
  get userdataDetailsArray(): FormArray {
    return this.demoForm.get('profileData') as FormArray;
  }

}


@Component({
  selector: 'dialog-user-login-dialog',
  template: `
  
  <form [formGroup]="mydemoForm" >
  <mat-form-field>
  <mat-label>Modify Display Name</mat-label>
  <input matInput formControlName = "displayName" style = "background-color:cornflowerblue;" >
  </mat-form-field>
  <mat-form-field>
  <mat-label>Modify Email</mat-label>
  <input matInput formControlName = "email" style = "background-color:cornflowerblue;" >
  </mat-form-field>
  <mat-form-field>
  <mat-label>Modify Ph Number</mat-label>
  <input matInput  formControlName = "phoneNumber" style = "background-color:cornflowerblue;" >
  </mat-form-field>
  <mat-form-field>
  <mat-label>Modify PhotoURL</mat-label>
  <input matInput formControlName = "photoURL" style = "background-color:cornflowerblue;" >
  </mat-form-field>
  <div mat-dialog-actions>
  <button mat-button (click)="onNoClick()" cdkFocusInitial>Clear</button>
  <button mat-button [mat-dialog-close]="mydemoForm.value">Save</button>
  </div>
  </form>

  `
})
export class DialogUserLogin {
  mydemoForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogUserLogin>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public formBuilder: FormBuilder) {

    this.mydemoForm = this.formBuilder.group({
      displayName: this.formBuilder.control(this.data.displayName),
      email: this.formBuilder.control(this.data.email),
      phoneNumber: this.formBuilder.control(this.data.phoneNumber),
      photoURL: this.formBuilder.control(this.data.photoURL)
    });

  }
  onNoClick(): void {
    this.mydemoForm.reset();
  }

}