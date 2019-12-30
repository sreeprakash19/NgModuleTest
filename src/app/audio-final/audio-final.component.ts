import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FamilydetailsService, UserInfoLogin, UserInfoLoginArray } from '../familydetails.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import * as firebase from 'firebase/app';
import { DomSanitizer } from '@angular/platform-browser';
declare var MediaRecorder: any;

export enum RecordingState {
  STOPPED = 'stopped',
  RECORDING = 'recording',
  FORBIDDEN = 'forbidden',
}

@Component({
  selector: 'app-audio-final',
  templateUrl: './audio-final.component.html',
  styleUrls: ['./audio-final.component.css']
})
export class AudioFinalComponent implements OnInit {
  myafterlogindata: UserInfoLogin;
  showspinner = true;
  dialogRefAudio: MatDialogRef<DialogAudioComponent> = null;
  public isOnline: boolean = navigator.onLine;
  storageRef: any;
  private basePath = '/audio';
  savetoDB: UserInfoLoginArray;
  saveorphan; string;
  constructor(public svc: FamilydetailsService, public dialog: MatDialog, private afs: AngularFirestore) {
    this.svc.currentMessageData.subscribe(afterlogindata => {
      if (afterlogindata !== null) {
        this.myafterlogindata = afterlogindata;
      }
    });
  }

  ngOnInit() {
  }
  openDialogPersonal() { }
  openDialogPicture() { }
  openDialogDates() { }
  openDialogFamily() { }

  async openDialogGreeting() {
    switch (this.isOnline) {
      case true:
        switch (await this.checkmystorage()) {
          case true:
            switch (this.myafterlogindata.downloadaudioURL) {
              case '':
                switch (await this.checkmydatabase()) {
                  case true:
                    this.openDialog();
                    break;
                  case false:
                    this.openAlert();
                    break;
                }
                break;
              default:
                this.openDialog();
                break;
            }
            break;
          case false:
            switch (this.myafterlogindata.downloadaudioURL) {
              case '':
                this.openDialog();
                break;
              default:
                switch (await this.checkmydatabase()) {
                  case true:
                    this.openDialog();
                    break;
                  case false:
                    this.openAlert();
                    break;
                }
            }
            break;
          default:
            this.openAlert();
            break;
        }
        break;
      case false:
        this.openAlert();
        break;
    }

    if (this.dialogRefAudio !== null) {
      this.dialogRefAudio.afterClosed().subscribe(result => {
        this.svc.AfterLoginSend(result);
        this.dialog.ngOnDestroy();
      });
    }
  }

  openDialog() {
    this.dialogRefAudio = this.dialog.open(DialogAudioComponent, {
      width: '350px', disableClose: true, data: this.myafterlogindata,
      backdropClass: 'backdropBackground'
    });
  }

  openAlert() {
    alert('Uh-oh, Connection Issue, Check Internet connection');
  }

  NextPage() { }
  dosomething() {
    this.showspinner = false;
  }
  async checkmystorage() {
    this.storageRef = firebase.storage().ref().child(`${this.basePath}/${this.myafterlogindata.Uid}`);
    try {
      const myurl = await this.storageRef.getDownloadURL();
      this.saveorphan = myurl;
      return true;
    } catch (error) {
      if (error.code === 'storage/object-not-found' || error.code === 'storage/canceled') {
        this.saveorphan = '';
        return false;
      } else {
        return null;
      }
    }
  }

  async checkmydatabase() {
    const ref = this.afs.firestore.collection('testcollections').doc(`${this.myafterlogindata.Uid}`);
    try {
      await this.afs.firestore.runTransaction(transaction =>
        transaction.get(ref).then(sfdoc => {
          this.savetoDB = sfdoc.data() as UserInfoLoginArray;
          this.savetoDB.downloadaudioURL = this.myafterlogindata.downloadaudioURL;
          transaction.update(ref, this.savetoDB);
        })
      );
      this.myafterlogindata.downloadaudioURL = this.saveorphan;
      return true;
    } catch (error) {
      return false;
    }
  }
}

@Component({
  selector: 'dialog-audio',
  template: `
  <mat-card fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="10%" style = "background:gold; font-family: Lato;" >
  
  <h2 mat-dialog-title>
  <mat-label>{{settingMsg}}</mat-label>  
  </h2>
  
  <div mat-dialog-content>
  
    <audio *ngFor="let audio of audioFiles" controls='true' [src]="audio" (error) = "connectionerror()">
    </audio>
    <section fxFlex="0 1 75%" *ngIf="showmicrophone">
      <button mat-fab color="primary"
      (click)="startRecording()" [disabled]= "disablemicrophone" >
      {{ state === 'recording' ? seconds : 'REC' }}</button> 
    </section>
  </div>
  <mat-spinner *ngIf= "showspinner"></mat-spinner>
  <div mat-dialog-actions>
  <button mat-raised-button color ="primary" (click)="ontask()" *ngIf="showbutton" [disabled]= "disablebutton" >{{AudioOption}} </button>
  <button mat-raised-button  color="primary" (click)="goback()" [disabled]= "disableback" cdkFocusInitial>Back</button>
  </div>
  </mat-card> 
`
})

export class DialogAudioComponent {
  settingMsg = '';
  state: RecordingState;
  disablemicrophone: boolean;
  showmicrophone; boolean;
  disablebutton: boolean;
  showbutton: boolean;
  audioFiles = [];
  showspinner = false;
  AudioOption = 'Delete';
  seconds = 0;
  savetoDB: UserInfoLoginArray = {
    displayName: 'Manoj Isaac',
    photoURL: 'https://lh3.googleusercontent.com/a-/AAuE7mDcM-XfiG-OgprYqulFoAgKDCAvnWSDiiLqiiXx',
    phoneNumber: '9978878789',
    Gender: 'Male',
    AnniversaryDate: 'Nov 11',
    BirthDate: 'Jan 28',
    customdisplayName: 'update DisplayedName',
    // tslint:disable-next-line: max-line-length
    customphotoURL: 'https://firebasestorage.googleapis.com/v0/b/angularsocial-c52dd.appspot.com/o/images%2Fhi.jpg?alt=media&token=7877d272-94c1-4f40-a673-afc81be73cf0',
    //customphotoURL: '',
    GiftsBank: 0,
    downloadaudioURL: ''
  }
  private itemDoc: AngularFirestoreDocument<UserInfoLoginArray>;

  intervalId = 0;
  mediaRecorder: any;
  streamRef: any;
  chunks = [];
  imageFile: any;
  private error;
  storageRef: any;
  saveRef: any;
  private basePath = '/audio';
  disableback = false;
  public isOnline: boolean = navigator.onLine;
  constructor(public dialogRef: MatDialogRef<DialogAudioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfoLogin, private cd: ChangeDetectorRef,
    private storage: AngularFireStorage, private afs: AngularFirestore, private dom: DomSanitizer) {
    this.state = RecordingState.STOPPED;
    if (data.downloadaudioURL !== '') {
      this.playgreeting();
    } else {
      this.recordgreeting();
    }

  }
  recordgreeting() {
    navigator.permissions.query({ name: 'microphone' }).then((result) => {
      switch (result.state) {
        case 'granted':
          this.showgranted();
          break;
        case 'prompt':
          this.showprompt();
          break;
        case 'denied':
          this.showdenied();
          break;
      }
      result.onchange = (event) => {
        switch (result.state) {
          case 'granted':
            this.showgranted();
            break;
          case 'prompt':
            this.showprompt();
            break;
          case 'denied':
            this.showdenied();
            break;
        }
      };
    });
  }
  playgreeting() {

    this.settingMsg = 'Play your Voice Greeting';

    this.showmicrophone = false;
    this.audioFiles.push(this.data.downloadaudioURL);
    this.disablemicrophone = true;

    this.showspinner = false;

    this.showbutton = true;
    this.disablebutton = false;
    this.AudioOption = 'Delete';

    this.disableback = false;
  }

  savegreeting() {
    this.settingMsg = 'Save your Voice Greeting';

    this.showmicrophone = false;
    this.disablemicrophone = true;

    this.showspinner = false;

    this.showbutton = true;
    this.disablebutton = false;
    this.AudioOption = 'Save';

    this.disableback = false;

  }

  showprompt() {
    this.settingMsg = 'Set Microphone settings';

    this.showmicrophone = true;
    this.disablemicrophone = true;

    this.showspinner = false;

    this.showbutton = true;
    this.disablebutton = false;
    this.AudioOption = 'Settings';

    this.disableback = false;

  }
  showgranted() {
    this.settingMsg = 'Set Your Voice Greeting';

    this.showmicrophone = true;
    this.disablemicrophone = false;

    this.showspinner = false;

    this.showbutton = false;
    this.disablebutton = false;
    this.AudioOption = 'Settings';

    this.disableback = false;
  }
  showdenied() {
    this.settingMsg = 'Microphone Setting is denied';

    this.showmicrophone = true;
    this.disablemicrophone = true;

    this.showspinner = false;

    this.showbutton = false;
    this.disablebutton = false;
    this.AudioOption = 'Settings';

    this.disableback = false;
  }
  showSettings() {
    const mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints);
    return;
  }
  async deleteOps() {
    const ref = this.afs.firestore.collection('testcollections').doc(`${this.data.Uid}`);
    try {
      await this.storage.storage.refFromURL(this.data.downloadaudioURL).delete();
      await this.afs.firestore.runTransaction(transaction =>
        transaction.get(ref).then(sfdoc => {
          this.savetoDB = sfdoc.data() as UserInfoLoginArray;
          this.savetoDB.downloadaudioURL = '';
          transaction.update(ref, this.savetoDB);
        })
      );
      return true;
    } catch (error) {
      return false;
    }
  }
  async saveOps() {
    const ref = this.afs.firestore.collection('testcollections').doc(`${this.data.Uid}`);
    try {
      const uploadURL = await this.storage.upload(`audio/${this.data.Uid}`, this.imageFile);
      await this.afs.firestore.runTransaction(transaction =>
        transaction.get(ref).then(async sfdoc => {
          this.savetoDB = sfdoc.data() as UserInfoLoginArray;
          this.savetoDB.downloadaudioURL = await uploadURL.ref.getDownloadURL();
          transaction.update(ref, this.savetoDB);
        })
      );
      return true;
    } catch (error) {
      return false;
    }
  }
  showError() {
    this.settingMsg = 'Play your Voice Greeting';

    this.showmicrophone = false;
    this.audioFiles.push('');
    this.disablemicrophone = true;

    this.showspinner = false;

    this.showbutton = false;
    this.disablebutton = false;
    this.AudioOption = 'Settings';

    this.disableback = false;

    alert('Uh-oh, Connection Issue, Check Internet connection');
  }

  connectionerror() {
    this.disablebutton = true;
    alert('Uh-oh, Connection Issue, Check Internet connection');
  }
  async ontask() {
    switch (this.AudioOption) {
      case 'Settings':
        this.showSettings();
        break;

      case 'Delete':
        this.settingMsg = 'Deleting...';

        this.showspinner = true;

        this.showbutton = false;
        this.disablebutton = false;
        this.AudioOption = 'Delete';

        this.disableback = false;
        switch (await this.deleteOps()) {
          case true:
            this.data.downloadaudioURL = '';
            this.audioFiles.pop();
            this.recordgreeting();
            break;
          case false:
            this.showError();
            break;
        }
        break;
      case 'Save':
        this.settingMsg = 'Saving...';

        this.showspinner = true;

        this.showbutton = false;
        this.disablebutton = false;
        this.AudioOption = 'Delete';

        this.disableback = false;
        switch (await this.saveOps()) {
          case true:
            this.data.downloadaudioURL = this.savetoDB.downloadaudioURL;
            this.audioFiles.pop();
            this.playgreeting();
            break;
          case false:
            this.showError();
            break;
        }
        break;
    }
  }


  goback() {
    this.dialogRef.close(this.data);
  }

  startRecording() {
    if (this.state === RecordingState.STOPPED) {//start recording
      const mediaConstraints = {
        video: false,
        audio: true
      };
      navigator.mediaDevices
        .getUserMedia(mediaConstraints)
        .then(this.mediaavialable.bind(this), this.mediaerror.bind(this));
      this.seconds = 9;
      this.state = RecordingState.RECORDING;
      this.clearTimer();
      this.intervalId = window.setInterval(() => {
        this.seconds -= 1;
        if (this.seconds === 0) {
          this.mediaRecorder.stop();
          this.streamRef.getTracks().map((val) => {
            val.stop();
            return;
          });
        }
      }, 1000);
    } else { //pressed again
      this.mediaRecorder.stop();
      this.streamRef.getTracks().map((val) => {
        val.stop();
        return;
      });
    }
  }

  mediaavialable(stream) {
    this.mediaRecorder = new MediaRecorder(stream);
    this.streamRef = stream;
    this.mediaRecorder.start();
    this.mediaRecorder.ondataavailable = e => {
      this.chunks.push(e.data);
      const blob = new Blob(this.chunks, { type: 'audio/ogg; codecs=opus' });
      const audioURL = URL.createObjectURL(blob);
      this.audioFiles.push(this.dom.bypassSecurityTrustUrl(audioURL));
      const imageName = this.data.Uid;
      this.imageFile = new File([blob], imageName, { type: 'audio/ogg; codecs=opus' });
      this.savegreeting();
    }
  }

  mediaerror() {
    this.showError();
  }

  clearTimer() {
    clearInterval(this.intervalId);
  }
}