import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { UserService } from '../../../user.service';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

export interface Functioninvites {
  photoUrl: string;
  displayName: string;
  phoneNumber: string;
  uid: string;
  eventmessage: string;
  eventid: string;
  eventName: string;
  eventTime: Time;
  eventDate: Date;
  eventLocation: string;
  eventMap: string;
  Removed: boolean;
}
export interface MyUserData {
  FunctioninviteData: Array<Functioninvites>;
}
//Invites can be removed
@Component({
  selector: 'app-login-user-update',
  templateUrl: './login-user-update.component.html',
  styleUrls: ['./login-user-update.component.css']
})
export class LoginUserUpdateComponent implements OnInit {
  demoForm = this.formBuilder.group({
    FunctioninviteData: this.formBuilder.array([])
  });
  FunctionData: Observable<MyUserData>;
  private itemDoc: AngularFirestoreDocument<MyUserData>;
  singleInvite: Functioninvites;
  MultipleInvites :  Array<Functioninvites>;
  constructor(public svc: UserService, public afAuth: AngularFireAuth, private afs: AngularFirestore,
    public dialog: MatDialog, public formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  docExists(uid: string) {
    return this.afs.doc(`testcollection/${uid}/functions/${uid}`).valueChanges().pipe(first()).toPromise();
  }
  async findOrCreate(uid: string) {

    const doc = await this.docExists(uid);

    if (doc) {
      this.itemDoc = this.afs.doc<MyUserData>(`testcollection/${uid}/functions/${uid}`);
      //this.itemDoc = this.afs.doc<MyUserData>(`testcollection/${uid}/invitees/${Fn_uid}`); // If rejected uid: false
      //this.itemDoc = this.afs.doc<MyUserData>(`testcollection/${uid}/myinvites/${uid}`); // If acceped add fn_uid, also uid:true
      //From the main component if there is a invite then update the tool tip, if anniversary or b'day message is received then also update the tooltip


      this.FunctionData = this.itemDoc.valueChanges();

      this.FunctionData.subscribe(v => {
        /*
        v.profileData.map(mydata => {
          const employeeFormGroups = v.profileData.map(details => this.formBuilder.group(details));
          const employeeFormArray = this.formBuilder.array(employeeFormGroups);
          this.demoForm.setControl('profileData', employeeFormArray);
          this.demoForm.get('profileData').patchValue(v.profileData);
          this.MultipleData = v.profileData;
          this.singleData = v.profileData[0];
        });*/

      });

      return 'doc exists';
    } else {
      return 'created new doc';
    }
  }


}
