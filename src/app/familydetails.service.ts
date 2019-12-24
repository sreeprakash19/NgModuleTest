import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserLogin {
  displayName: string;
  photoURL: string;
  phoneNumber: string;
  Gender: string;
  Uid: string;
}
export interface UserInfoLogin extends UserLogin {
  AnniversaryDate: string;
  BirthDate: string;
  customdisplayName: string;
  customphotoURL: string;
  GiftsBank: number;
  downloadaudioURL: string;
}
export interface UserInfoLoginArray {
  displayName: string;
  photoURL: string;
  phoneNumber: string;
  Gender: string;
  AnniversaryDate: string;
  BirthDate: string;
  customdisplayName: string;
  customphotoURL: string;
  GiftsBank: number;
  downloadaudioURL: string;
  //profileData: Array<FromDatabase>;
}
export interface FromDatabase {
  displayName: string;
  photoURL: string;
  phoneNumber: string;
  Gender: string;
  AnniversaryDate: string;
  BirthDate: string;
  customdisplayName: string;
  customphotoURL: string;
  GiftsBank: number;
  downloadaudioURL: string;
}
@Injectable({
  providedIn: 'root'
})
export class FamilydetailsService {
  AfterLoginData : UserInfoLogin = {
    displayName: 'Manoj Isaac',
    photoURL: 'https://lh3.googleusercontent.com/a-/AAuE7mDcM-XfiG-OgprYqulFoAgKDCAvnWSDiiLqiiXx',
    phoneNumber: '9978878789',
    Gender: 'Male',
    Uid: 'KjMfJfNSJzVuV7X5ds8Xu0KUCvG2',
    AnniversaryDate: 'Nov 11',
    BirthDate: 'Jan 28',
    customdisplayName: 'update DisplayedName',
    // tslint:disable-next-line: max-line-length
    customphotoURL: 'https://firebasestorage.googleapis.com/v0/b/angularsocial-c52dd.appspot.com/o/images%2Fhi.jpg?alt=media&token=7877d272-94c1-4f40-a673-afc81be73cf0',
    //customphotoURL: '',
    GiftsBank: 0,
    downloadaudioURL: 'https://firebasestorage.googleapis.com/v0/b/angularsocial-c52dd.appspot.com/o/audio%2F1577182412738_AFSvN?alt=media&token=11c3f070-ba23-46df-af61-8d4ff369d620'
  }
  public savedValue: BehaviorSubject<UserInfoLogin> = new BehaviorSubject<UserInfoLogin>(this.AfterLoginData);
  currentMessageData = this.savedValue.asObservable();

  AfterLoginSend(saveData : UserInfoLogin){
    this.savedValue.next(saveData);
  }
  
  constructor() { }
}
//https://firebasestorage.googleapis.com/v0/b/angularsocial-c52dd.appspot.com/o/images%2Fhi.jpg?alt=media&token=7877d272-94c1-4f40-a673-afc81be73cf0
//https://firebasestorage.googleapis.com/v0/b/angularsocial-c52dd.appspot.com/o/audio%2F1575464849109_fvkMr?alt=media&token=3f7d09e7-f69e-41d3-8e99-8a62f12e9b77