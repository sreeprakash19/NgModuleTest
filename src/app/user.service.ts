import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import {
  AngularFirestoreDocument,
  AngularFirestore
} from '@angular/fire/firestore';

import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { delay } from 'rxjs/operators';

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
export interface AfterVideoData {
  displayName: string;
  photoURL: string;
  phoneNumber: string;
  Gender: string;
  AnniversaryDate: string;
  BirthDate: string;
  customdisplayName: string;
  customphotoURL: string;
  GiftsBank: number;
  customaudioURL: string;
}

export interface MyUserData {
  profileData: Array<DialogData>;
}
export interface MyAfterVideoData {
  profileData: Array<AfterVideoData>;
}

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
}

export interface UserAudioLogin extends UserInfoLogin {
  customaudioURL: string;
}

//----------------- just saving to the next screen is the task
const ALTER_EGOS = ['Eric'];

export class CollegeDept {
  deptHead = '';
  deptName = '';
  constructor(deptHead, deptName) {
    this.deptHead = deptHead;
    this.deptName = deptName;
  }
}

export class College {
  CollegeName = '';
  PrincipalName = '';
  constructor(CollegeName, PrincipalName) {
    this.CollegeName = CollegeName;
    this.PrincipalName = PrincipalName;
  }
}

export class CollegeEmp {
  empId = '';
  empName = '';
  skill = '';
}

export class Department {
  deptHead = '';
  deptName = '';
  constructor(deptHead, deptName) {
    this.deptHead = deptHead;
    this.deptName = deptName;
  }
}

export class Team {
  teamName = '';
  teamManager = '';
  teamDept: Department;
  employees: Employee[];
}

export class Employee {
  empId = '';
  empName = '';
  skill = '';
  constructor(empId, empName, skill) {
    this.empId = empId;
    this.empName = empName;
    this.skill = skill;
  }
}


export const ALL_SKILLS = [
  { name: 'Java', displayName: 'Java' },
  { name: 'Angular', displayName: 'Angular' },
  { name: 'Dot Net', displayName: 'Dot Net' }
];

export const ALL_TEAMS: Team[] = [
  {
    "teamName": "Java Team",
    "teamManager": "Yogi",
    "teamDept": {
      "deptHead": "Modi",
      "deptName": "M Commerce"
    },
    "employees": [
      {
        "empId": "101",
        "empName": "Harish",
        "skill": "Java"
      },
      {
        "empId": "111",
        "empName": "Mohit",
        "skill": "Angular"
      }
    ]
  }
];



@Injectable({
  providedIn: 'root',
})
export class UserService {
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
  InitialValueLogin : UserInfoLogin = {
    displayName: 'Manoj Isaac',
    photoURL: 'https://lh3.googleusercontent.com/a-/AAuE7mDcM-XfiG-OgprYqulFoAgKDCAvnWSDiiLqiiXx',
    phoneNumber: '9978878789',
    Gender: 'Male',
    Uid: 'KjMfJfNSJzVuV7X5ds8Xu0KUCvG2',
    AnniversaryDate: '',
    BirthDate: '',
    customdisplayName: 'update DisplayedName',
    customphotoURL: 'https://firebasestorage.googleapis.com/v0/b/angularsocial-c52dd.appspot.com/o/images%2F1575031626761_tp2YQ?alt=media&token=06883cc9-7d2c-430f-91f8-e32cb89c9421',
    GiftsBank: 0
  };
  
  AfterLoginVideo : UserAudioLogin = {
    displayName: 'Manoj Isaac',
    photoURL: 'https://lh3.googleusercontent.com/a-/AAuE7mDcM-XfiG-OgprYqulFoAgKDCAvnWSDiiLqiiXx',
    phoneNumber: '9978878789',
    Gender: 'Male',
    Uid: 'KjMfJfNSJzVuV7X5ds8Xu0KUCvG2',
    AnniversaryDate: '',
    BirthDate: '',
    customdisplayName: 'update DisplayedName',
    customphotoURL: 'https://firebasestorage.googleapis.com/v0/b/angularsocial-c52dd.appspot.com/o/images%2F1575031626761_tp2YQ?alt=media&token=06883cc9-7d2c-430f-91f8-e32cb89c9421',
    GiftsBank: 0,
    customaudioURL: ''
  }
  public myInitialValue: BehaviorSubject<UserInfoLogin> = new BehaviorSubject<UserInfoLogin>(this.InitialValue);
  public myInitialValueLogin: BehaviorSubject<UserInfoLogin> = new BehaviorSubject<UserInfoLogin>(this.InitialValueLogin);
  public myAfterVideoLogin: BehaviorSubject<UserAudioLogin> = new BehaviorSubject<UserAudioLogin>(this.AfterLoginVideo);

  currentMessageData = this.myInitialValue.asObservable();
  currentMessageDataLogin = this.myInitialValueLogin.asObservable();
  currentAfterVideoLogin = this.myAfterVideoLogin.asObservable();
  
  AfterLoginUpdate(saveData : UserInfoLogin){
    this.myInitialValueLogin.next(saveData);
  }
  AfterVideoideo(saveData : UserAudioLogin){
    this.myAfterVideoLogin.next(saveData);
  }
  //-------------------
  public counter = 0;
  hellotext = '';
  hello = 0;
  footerdisplay = '';
  sidebardisplay = '';
  resultdisplay = '';
  moredisplay = '';
  hellostring = '';
  public myData: BehaviorSubject<number> = new BehaviorSubject<number>(this.hello);
  public myLoginData: BehaviorSubject<string> = new BehaviorSubject<string>(this.hellostring);


  myarray: any[];
  constructor(private http: HttpClient,  public afAuth: AngularFireAuth, private afs: AngularFirestore) { }

  increaseCounter() {
    this.counter++;
    this.hello = this.counter;
    this.myData.next(this.hello);
  }

  sendData(mytext) {
    this.myData.next(mytext);
  }

  //team
  getSkills() {
    return of(ALL_SKILLS);
  }
  getAllTeams(): Observable<Team[]> {
    return of(ALL_TEAMS);
  }
  getTeamByName(name: string): Observable<Team> {
    return this.getAllTeams().pipe(map(allTeams => allTeams.find(team => team.teamName === name)));
  }
  saveTeam(team: Team) {
    console.log('------------TEAM------------');
    console.log('Team Name: ' + team.teamName);
    console.log('Team Manager: ' + team.teamManager);
    console.log('Dept Head: ' + team.teamDept.deptHead);
    console.log('Dept Name: ' + team.teamDept.deptName);
    console.log('----- Employee Detail -----');
    for (let emp of team.employees) {
      console.log('Emp Id: ' + emp.empId);
      console.log('Emp Name: ' + emp.empName);
      console.log('Emp Skill: ' + emp.skill);
      console.log('-------------------');
    }
  }
  isAlterEgoTaken(alterEgo: string): Observable<boolean> {
    const yestaken = true;
    const nottaken = false;
    const isTaken = ALTER_EGOS.filter(s => s.includes(alterEgo));
    if (isTaken.length === 0) {
      return of(nottaken).pipe(delay(400));
    } else {
      return of(yestaken).pipe(delay(400));
    }
  }
  onLoginGoogle()   {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(successLogin =>{
      this.findOrCreate(successLogin.user.uid).then(result => {
        if( result != null) {
          if (result === 'created new doc') { 
            this.myLoginData.next('new');
          }else
          {
            this.myLoginData.next('old');
          }
        }
      });
    }).catch(error => {
      this.myLoginData.next('error');
    });
  }

  docExists(uid: string) {
    return this.afs.doc(`UserData/${uid}`).valueChanges().pipe(first()).toPromise();
  }
  async findOrCreate(uid: string) {
    const doc = await this.docExists(uid);
    console.log('doc returned', doc);
    if (doc) {
      return 'doc exists';
    } else {
      return 'created new doc';
    }
  }
}


