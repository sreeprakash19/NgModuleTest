import { Component, OnInit } from '@angular/core';
import { Observable, Observer, BehaviorSubject } from 'rxjs';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestoreDocument,
  AngularFirestore
} from '@angular/fire/firestore';
import { UserService } from '../user.service';
export interface UserInfo {
  photoURL: string;
  ExistingUserClear: number;
  NewUser : number;
  AngularMaterial : number;
  AngularFlexbox : number;
  ReactiveForms : number;
  FirebaseBackEnd : number;
  ToolDesign : number;
  ToolDevelopment: number;
  Total : number;
}

export interface UserInfoAuth {
  displayName: string;
  photoURL: string;
}

export interface UserLoginAuth extends UserInfoAuth {
  uid: string;
}

@Component({
  selector: 'app-env-setup',
  templateUrl: './env-setup.component.html',
  styleUrls: ['./env-setup.component.css']
})
export class EnvSetupComponent implements OnInit {
  myuserdata: UserLoginAuth = {
    displayName: 'Manoj Isaac',
    photoURL: null,
    uid: null
  };
  beforeLogin: true;
  public myData: BehaviorSubject<UserLoginAuth> = new BehaviorSubject<UserLoginAuth>(this.myuserdata);
  myavatardata: string;

  //query
  scoreItemsDoc: AngularFirestoreDocument<UserInfo>;
  scoreItems: Observable<UserInfo[]>; //returns the result of query

  constructor(public afAuth: AngularFireAuth,  public afs: AngularFirestore, public svc: UserService) {

   }

  ngOnInit() {
    this.svc.footerdisplay = `
      Initialize behaviorSubject - myData as
      {
        displayName: 'Manoj Isaac',
        photoURL: 'https://lh3.googleusercontent.com/a-/AAuE7mDcM-XfiG-OgprYqulFoAgKDCAvnWSDiiLqiiXx',
        uid: null
      };
    `;
    this.svc.resultdisplay =``;
    this.svc.moredisplay = ``;

  }

  openLogin(){
    const sendSavedData: UserLoginAuth = {
      displayName: 'Manoj Isaac', photoURL: 'https://lh3.googleusercontent.com/a-/AAuE7mDcM-XfiG-OgprYqulFoAgKDCAvnWSDiiLqiiXx',
       uid:  'KjMfJfNSJzVuV7X5ds8Xu0KUCvG2'
    };
    this.myavatardata= 'https://lh3.googleusercontent.com/a-/AAuE7mDcM-XfiG-OgprYqulFoAgKDCAvnWSDiiLqiiXx';
    this.myData.next( sendSavedData);
    this.svc.footerdisplay = `
    Change behaviorSubject - myData as
    {
      displayName: 'Manoj Isaac', photoURL: 'https://lh3.googleusercontent.com/a-/AAuE7mDcM-XfiG-OgprYqulFoAgKDCAvnWSDiiLqiiXx',
       uid:  'KjMfJfNSJzVuV7X5ds8Xu0KUCvG2'
    };
  `;
  }
  OpenReport(){
    this.scoreItems = this.afs.collection<UserInfo>('ScoreLesson1', ref => ref.orderBy('Total', 'desc').limit(5)).valueChanges();
    this.svc.footerdisplay = `
    Take Last 5 values
     
   `;
  }
  OpenTimeEntry(uid: string){
    this.svc.footerdisplay = `
   Use uid:  'KjMfJfNSJzVuV7X5ds8Xu0KUCvG2' data to write into db
    
  `;
  }
  LogoutGoogle(){
    const sendSavedData: UserLoginAuth = {
      displayName: 'Manoj Isaac', photoURL: 'https://lh3.googleusercontent.com/a-/AAuE7mDcM-XfiG-OgprYqulFoAgKDCAvnWSDiiLqiiXx',
       uid:  null
    };
    this.myavatardata= null;
    this.myData.next( sendSavedData);
    this.svc.footerdisplay = `
    Logout data behaviorSubject - myData as
    {
      displayName: 'Manoj Isaac', photoURL: 'https://lh3.googleusercontent.com/a-/AAuE7mDcM-XfiG-OgprYqulFoAgKDCAvnWSDiiLqiiXx',
       uid:  'null'
    };
  `;
  }
}
