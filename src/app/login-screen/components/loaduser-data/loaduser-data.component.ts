import { Component, OnInit, Inject } from '@angular/core';
import { UserService, UserInfoLogin } from '../../../user.service';
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
import { ChangeDetectorRef } from '@angular/core';

export interface DialogData {
  displayName: string;
  photoURL: string;
  phoneNumber: string;
  Gender: string;
  AnniversaryDate: string;
  BirthDate: string;
  customdisplayName: string;
  customphotoURL: string;
  GiftsBank: number;
}
export interface MyUserData {
  profileData: Array<DialogData>;
}
export interface Gender {
  value: string;
  viewValue: string;
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
  singleData: DialogData = {
    displayName: '',
    photoURL: '',
    phoneNumber: '',
    Gender: '',
    AnniversaryDate: '',
    BirthDate: '',
    customdisplayName: '',
    customphotoURL: '',
    GiftsBank: 0
  };
  MultipleData : Array<DialogData> = [];
  InitialValue : UserInfoLogin = {
    displayName: '',
    photoURL: '',
    phoneNumber: '',
    Gender: '',
    Uid: '',
    AnniversaryDate: '',
    BirthDate: '',
    customdisplayName: '',
    customphotoURL: '',
    GiftsBank: 0
  };
  basicDetails: FormGroup;
  gender: Gender[] = [
    {value: 'Male', viewValue: 'male'},
    {value: 'Female', viewValue: 'female'},
    {value: 'Other', viewValue: 'other'}
  ];
  constructor(public svc: UserService, public afAuth: AngularFireAuth, private afs: AngularFirestore,
    public dialog: MatDialog, public formBuilder: FormBuilder, private ref: ChangeDetectorRef) {

    this.GoogleLogout();
  }

  ngOnInit() {
  }

  docExists(uid: string) {
    return this.afs.doc(`testcollections/${uid}`).valueChanges().pipe(first()).toPromise().catch(error => {
      return 'Retry Login';
    });
  }
  async findOrCreate(uid: string) {

    const doc = await this.docExists(uid);
    if( doc === 'Retry Login' ){
      return 'Retry Login';
    }
    this.itemDoc = this.afs.doc<MyUserData>(`testcollections/${uid}`);
    if (doc) {
      this.somedata = this.itemDoc.valueChanges();

      this.somedata.subscribe(v => {
        v.profileData.map(mydata => {
          const employeeFormGroups = v.profileData.map(details => this.formBuilder.group(details));
          const employeeFormArray = this.formBuilder.array(employeeFormGroups);
          this.demoForm.setControl('profileData', employeeFormArray);
          this.demoForm.get('profileData').patchValue(v.profileData);
          this.MultipleData = v.profileData;
          this.singleData = { ...v.profileData[0] };
          console.log('read from DB', this.singleData );
        });

      });
      return 'doc exists';
    } else {

      this.MultipleData.push(this.singleData);
      return 'created new doc';
    }
  }

  GoogleLogin() {
    this.showspinner = true;

    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(successLogin => {
      this.findOrCreate(successLogin.user.uid).then(result => {
        if( result === 'Retry Login' ){
          this.ref.markForCheck();
          this.showspinner = false;
          this.showlogin = false;
          this.showretry = true;
          this.ref.detectChanges();
        }
        if (result != null) {
          if (result === 'created new doc') { //new
            this.ref.markForCheck();

            this.showspinner = false;
            this.showlogin = false;
            this.shownewUser = true;
            this.showretry = false;
            this.ref.detectChanges();
            this.InitialValue = {
              displayName: successLogin.user.displayName,
              photoURL: successLogin.user.photoURL,
              phoneNumber: successLogin.user.phoneNumber,
              Gender: '',
              Uid: successLogin.user.uid,
              AnniversaryDate: '',
              BirthDate: '',
              customdisplayName: '',
              customphotoURL: '',
              GiftsBank: 0
            };
            this.singleData.displayName = successLogin.user.displayName;
            this.singleData.photoURL =  successLogin.user.photoURL;
            this.singleData.phoneNumber = successLogin.user.phoneNumber;
            this.singleData.GiftsBank = 0 ;

            this.basicDetails = this.formBuilder.group({
              PhoneNumber: [successLogin.user.phoneNumber, Validators.required],
              Gender: ['Other', Validators.required]
            });

            
          } else {//old
            this.ref.markForCheck();
            this.showspinner = false;
            this.showlogin = false;
            this.showoldUser = true;
            this.showretry = false;
            this.ref.detectChanges();
            this.InitialValue.displayName = successLogin.user.displayName;
            this.InitialValue.photoURL = successLogin.user.photoURL;
            this.InitialValue.phoneNumber = successLogin.user.phoneNumber;
            this.InitialValue.Uid = successLogin.user.uid;
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
  GoogleLogout() {
    this.afAuth.auth.signOut();
  }
  OldUserContinue() {
    this.InitialValue.Gender = this.singleData.Gender;
    this.InitialValue.AnniversaryDate = this.singleData.AnniversaryDate;
    this.InitialValue.BirthDate = this.singleData.BirthDate;
    this.InitialValue.customdisplayName = this.singleData.customdisplayName;
    this.InitialValue.customphotoURL = this.singleData.customphotoURL;
    this.InitialValue.GiftsBank = this.singleData.GiftsBank;
    this.svc.sendData(this.InitialValue);
    console.log('old', this.InitialValue);

    const dialogRef = this.dialog.open(DialogUserLogin, {
      width: '250px', data: this.singleData
    });
    dialogRef.afterClosed().subscribe(result  => {
      if(result != null){
      this.singleData = result;
      this.MultipleData[0] = result;
      const profileFormGroups = this.MultipleData.map(details => this.formBuilder.group(details));
      const profileFormArray = this.formBuilder.array(profileFormGroups);
      this.demoForm.setControl('profileData', profileFormArray);
      this.demoForm.get('profileData').patchValue(this.MultipleData);
      console.log('Saved Values:',this.demoForm.value);
      this.itemDoc.update(this.demoForm.value);
      }
    });
  }
  get userdataDetailsArray(): FormArray {
    return this.demoForm.get('profileData') as FormArray;
  }
  NewUserContinue(){
    this.InitialValue.phoneNumber = this.basicDetails.get('PhoneNumber').value;
    this.InitialValue.Gender = this.basicDetails.get('Gender').value;
    this.svc.sendData(this.InitialValue);
    this.singleData.phoneNumber = this.InitialValue.phoneNumber;
    this.singleData.Gender = this.InitialValue.Gender;
    this.MultipleData[0] = this.singleData;
    const profileFormGroups = this.MultipleData.map(details => this.formBuilder.group(details));
    const profileFormArray = this.formBuilder.array(profileFormGroups);
    this.demoForm.setControl('profileData', profileFormArray);
    this.demoForm.get('profileData').patchValue(this.MultipleData);
    this.itemDoc.set(this.demoForm.value);
    console.log('new', this.InitialValue);
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
  <mat-label>Modify PhotoURL</mat-label>
  <input matInput formControlName = "photoURL" style = "background-color:cornflowerblue;" >
  </mat-form-field>
  <mat-form-field>
  <mat-label>Modify Ph Number</mat-label>
  <input matInput  formControlName = "phoneNumber" style = "background-color:cornflowerblue;" >
  </mat-form-field>
  <mat-form-field>
  <mat-label>Modify Gender</mat-label>
  <input matInput formControlName = "Gender" style = "background-color:cornflowerblue;" >
  </mat-form-field>
  <!--<mat-form-field>
  <mat-label>Anniversary Date</mat-label>
  <input matInput formControlName = "AnniversaryDate" style = "background-color:cornflowerblue;" >
  </mat-form-field>
  <mat-form-field>
  <mat-label>BirthDate</mat-label>
  <input matInput formControlName = "BirthDate" style = "background-color:cornflowerblue;" >
  </mat-form-field>
  <mat-form-field>
  <mat-label>customdisplayName</mat-label>
  <input matInput formControlName = "customdisplayName" style = "background-color:cornflowerblue;" >
  </mat-form-field>
  <mat-form-field>
  <mat-label>customphotoURL</mat-label>
  <input matInput formControlName = "customphotoURL" style = "background-color:cornflowerblue;" >
  </mat-form-field>
  <mat-form-field>
  <mat-label>GiftsBank</mat-label>
  <input matInput formControlName = "GiftsBank" style = "background-color:cornflowerblue;" >
  </mat-form-field>-->
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
      phoneNumber: this.formBuilder.control(this.data.phoneNumber),
      photoURL: this.formBuilder.control(this.data.photoURL),
      Gender: this.formBuilder.control(this.data.Gender),
      AnniversaryDate: this.formBuilder.control(this.data.AnniversaryDate),
      BirthDate: this.formBuilder.control(this.data.BirthDate),
      customdisplayName: this.formBuilder.control(this.data.customdisplayName),
      customphotoURL: this.formBuilder.control(this.data.customphotoURL),
      GiftsBank: this.formBuilder.control(this.data.GiftsBank)
    });

  }
  onNoClick(): void {
    this.mydemoForm.reset();
  }
}
