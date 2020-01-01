import { Component, OnInit, Inject, ChangeDetectorRef, ViewChild, AfterContentInit } from '@angular/core';
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
  myafterlogindata: UserInfoLogin = {
    displayName: '',
    photoURL: '',
    phoneNumber: '',
    Gender: '',
    Uid: '',
    AnniversaryDate: '',
    BirthDate: '',
    customdisplayName: '',
    
    customphotoURL: '',
    GiftsBank: 0,
    downloadaudioURL: ''
  };
  showspinner = true;
  dialogRefAudio: MatDialogRef<DialogAudioComponent> = null;
  public isOnline: boolean = navigator.onLine;
  storageRef: any;
  private basePath: string;
  savetoDB: UserInfoLoginArray;
  saveorphan; string;
  dialogRefPic: MatDialogRef<DialogPicComponent> = null;
  saveprofile: string;

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
  async openDialogPicture() { 
    switch (this.isOnline) {
      case true:
        switch (await this.checkPicstorage()) {
          case true:
            switch (this.myafterlogindata.downloadaudioURL) {
              case '':
                switch (await this.checkPicdatabase()) {
                  case true:
                    this.openPicDialog();
                    break;
                  case false:
                    this.openAlert();
                    break;
                }
                break;
              default:
                this.openPicDialog();
                break;
            }
            break;
          case false:
            switch (this.myafterlogindata.photoURL) {
              case '':
                this.openPicDialog();
                break;
              default:
                switch (await this.writePicdatabase()) {
                  case true:
                    this.openPicDialog();
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

    if (this.dialogRefPic !== null) {
      this.dialogRefPic.afterClosed().subscribe(result => {
        if(result !== null){
          if (result.photoURL !== ''){
            this.saveprofile = result.customphotoURL;
            result.customphotoURL = result.photoURL;
          } else{
            result.customphotoURL = this.saveprofile;
          }
          this.svc.AfterLoginSend(result);
          this.dialog.ngOnDestroy();
        }
      });
    }
  }
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
                switch (await this.writemydatabase()) {
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

  openPicDialog() {
    this.dialogRefPic = this.dialog.open(DialogPicComponent, {
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
    this.basePath = '/audio';
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
    this.basePath = '/audio';
    const ref = this.afs.firestore.collection('testcollections').doc(`${this.myafterlogindata.Uid}`);
    try {
      await this.afs.firestore.runTransaction(transaction =>
        transaction.get(ref).then(async sfdoc => {
          this.savetoDB = sfdoc.data() as UserInfoLoginArray;
          this.savetoDB.downloadaudioURL = this.saveorphan;
          transaction.update(ref, this.savetoDB);
        })
      );
      this.myafterlogindata.downloadaudioURL = this.saveorphan;
      return true;
    } catch (error) {
      return false;
    }
  }
  async writemydatabase() {
    this.basePath = '/audio';
    const ref = this.afs.firestore.collection('testcollections').doc(`${this.myafterlogindata.Uid}`);
    try {
      await this.afs.firestore.runTransaction(transaction =>
        transaction.get(ref).then(sfdoc => {
          this.savetoDB = sfdoc.data() as UserInfoLoginArray;
          this.savetoDB.downloadaudioURL = '';
          transaction.update(ref, this.savetoDB);
        })
      );
      this.myafterlogindata.downloadaudioURL = '';
      return true;
    } catch (error) {
      return false;
    }
  }

  async checkPicstorage() {
    this.basePath = '/image';
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

  async checkPicdatabase() {
    this.basePath = '/image';
    const ref = this.afs.firestore.collection('testcollections').doc(`${this.myafterlogindata.Uid}`);
    try {
      await this.afs.firestore.runTransaction(transaction =>
        transaction.get(ref).then(async sfdoc => {
          this.savetoDB = sfdoc.data() as UserInfoLoginArray;
          this.savetoDB.photoURL = this.saveorphan;
          transaction.update(ref, this.savetoDB);
        })
      );
      this.myafterlogindata.photoURL = this.saveorphan;
      return true;
    } catch (error) {
      return false;
    }
  }
  async writePicdatabase() {
    this.basePath = '/image';
    const ref = this.afs.firestore.collection('testcollections').doc(`${this.myafterlogindata.Uid}`);
    try {
      await this.afs.firestore.runTransaction(transaction =>
        transaction.get(ref).then(sfdoc => {
          this.savetoDB = sfdoc.data() as UserInfoLoginArray;
          this.savetoDB.photoURL = '';
          transaction.update(ref, this.savetoDB);
        })
      );
      this.myafterlogindata.photoURL = '';
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

        //audio option is pushed
        this.showspinner = true;

        this.showbutton = false;
        this.disablebutton = false;
        this.AudioOption = 'Delete';

        this.disableback = true;
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

        this.disableback = true;
        switch (await this.saveOps()) {
          case true:
            this.data.downloadaudioURL = this.savetoDB.downloadaudioURL;            
            this.audioFiles.pop();
            this.chunks.pop();
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
      this.state = RecordingState.RECORDING;
      const mediaConstraints = {
        video: false,
        audio: true
      };
      navigator.mediaDevices
        .getUserMedia(mediaConstraints)
        .then(this.mediaavialable.bind(this), this.mediaerror.bind(this));
      this.seconds = 9;
      
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

@Component({
  selector: 'dialog-picture',
  template: `
  <mat-card fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="10%" style = "background:gold; font-family: Lato;" >
  <h2 mat-dialog-title>
  <mat-label>{{settingMsg}}</mat-label>  
  </h2>
  <img mat-card-image *ngIf="this.AudioOption === 'Settings'" src= "{{savetoDB.customphotoURL}}">
  <img mat-card-image *ngIf="this.AudioOption === 'Delete'" src= "{{savetoDB.photoURL}}">
  <div mat-dialog-content >
    <video #video autoplay playsinline  *ngIf="showcamera" (durationchange)="AfterVideoLoad()"></video>    
    <section fxFlex="0 1 75%">
    <canvas #canvas id="canvas" width="200" height="200" style="border:1px solid #d3d3d3;"></canvas>
    </section>
  </div>
  <mat-spinner *ngIf= "showspinner" [diameter]="30"></mat-spinner>
  <div mat-dialog-actions>
  <button mat-raised-button color ="primary" (click)="ontask()" *ngIf="showbutton" [disabled]= "disablebutton" >{{AudioOption}} </button>
  <button mat-raised-button  color="primary" (click)="goback()" [disabled]= "disableback" cdkFocusInitial>Back</button>
  </div>
  </mat-card> 
`
})

export class DialogPicComponent implements AfterContentInit {
  settingMsg = '';
  state: RecordingState;

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
  showcamera = false;
  showcanvas = true;
  
  @ViewChild('video', { static: false }) video: any;
  @ViewChild('canvas', { static: true }) canvas: any;
  canvasElement: any;
  context: any;
  videoElement: HTMLVideoElement;
  videostreamRef: any;

  public isOnline: boolean = navigator.onLine;
  constructor(public dialogRef: MatDialogRef<DialogAudioComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UserInfoLogin, private cd: ChangeDetectorRef,
              private storage: AngularFireStorage, private afs: AngularFirestore, private dom: DomSanitizer) {
    this.state = RecordingState.STOPPED;
    this.savetoDB = this.data;
    if (this.data.photoURL !== '') {
      
      this.showspinner = true;
  
      this.playgreeting();
    } else {
      this.showspinner = true;
      this.showcamera = true;
      this.recordgreeting();
    }

  }
  ngAfterContentInit(){
    this.canvas.nativeElement.style.display = 'none';
    
  }

  AfterVideoLoad(){
    this.showspinner = false;
  }
  recordgreeting() {
    navigator.permissions.query({ name: 'camera' }).then((result) => {
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

    this.settingMsg = 'Your Profile Image';

    //this.showmicrophone = false;
    //this.audioFiles.push(this.data.downloadaudioURL);
    //this.disablemicrophone = true;

    this.showspinner = false;

    this.showbutton = true;
    this.disablebutton = false;
    this.AudioOption = 'Delete';

    this.disableback = false;
  }

  savegreeting() {
    this.settingMsg = 'Save your Voice Greeting';

    //this.showmicrophone = false;
    //this.disablemicrophone = true;

    this.showspinner = false;

    this.showbutton = true;
    this.disablebutton = false;
    this.AudioOption = 'Save';

    this.disableback = false;

  }

  showprompt() {
    this.settingMsg = 'Change Camera settings';

    //this.showmicrophone = true;
    //this.disablemicrophone = true;

    this.showspinner = false;

    this.showbutton = true;
    this.disablebutton = false;
    this.AudioOption = 'Settings';

    this.disableback = false;

  }
  showgranted() {
    this.settingMsg = 'Please wait !..';
    this.videoElement = this.video.nativeElement;
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 200, height: 200, facingMode: 'user', aspectRatio: .5 }
      })
      .then(stream => {
        this.videoElement.srcObject = stream;
        this.videostreamRef = stream;
        this.settingMsg = 'Set Your Profile Picture';
      });

    
    this.showcamera = true;
    

    //this.showspinner = false;

    this.showbutton = true;
    this.disablebutton = false;
    this.AudioOption = 'Take Picture';

    this.disableback = false;
  }

  showdenied() {
    this.settingMsg = 'Microphone Setting is denied';

    //this.showmicrophone = true;
    //this.disablemicrophone = true;

    this.showspinner = false;

    this.showbutton = false;
    this.disablebutton = false;
    this.AudioOption = 'Settings';

    this.disableback = false;
  }
  showSettings() {
    const mediaConstraints = {
      video: true,
      audio: false
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints);
    return;
  }
  async deleteOps() {
    const ref = this.afs.firestore.collection('testcollections').doc(`${this.data.Uid}`);
    try {
      await this.storage.storage.refFromURL(this.data.photoURL).delete();
      await this.afs.firestore.runTransaction(transaction =>
        transaction.get(ref).then(sfdoc => {
          this.savetoDB = sfdoc.data() as UserInfoLoginArray;
          this.savetoDB.photoURL = '';
          transaction.update(ref, this.savetoDB);
        })
      );
      return true;
    } catch (error) {
      return false;
    }
  }
  async saveOps() {
    const img = this.canvasElement.toDataURL();
    let byteString;
    if (img.split(',')[0].indexOf('base64') >= 0){
      byteString = atob(img.split(',')[1]);
    } else{
      byteString = unescape(img.split(',')[1]);
    }
    // separate out the mime component
    const mimeString = img.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    const ref = this.afs.firestore.collection('testcollections').doc(`${this.data.Uid}`);
    try {
      const uploadURL = await this.storage.upload(`image/${this.data.Uid}`, new Blob([ia], {type: mimeString}));
      await this.afs.firestore.runTransaction(transaction =>
        transaction.get(ref).then(async sfdoc => {
          this.savetoDB = sfdoc.data() as UserInfoLoginArray;
          this.savetoDB.photoURL = await uploadURL.ref.getDownloadURL();
          transaction.update(ref, this.savetoDB);
        })
      );
      return true;
    } catch (error) {
      return false;
    }
  }
  showError() {
    this.settingMsg = 'Your Profile Image- Error';

    //this.showmicrophone = false;
    //this.disablemicrophone = true;

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

        this.disableback = true;
        switch (await this.deleteOps()) {
          case true:
            this.data.photoURL = '';
            //this.canvas.nativeElement.style.display = 'none';
            this.showcamera = false;
            this.goback();
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

        this.disableback = true;
        console.log('after save', this.data );
        switch (await this.saveOps()) {
          case true:
            this.data.photoURL = this.savetoDB.photoURL;
            this.canvas.nativeElement.style.display = 'none';
            this.showcamera = false;
            this.goback();
            break;
          case false:
            this.showError();
            break;
        }
        break;

      case 'Take Picture':
        this.showcamera = false;
        this.canvas.nativeElement.style.display = 'block';
        this.canvasElement = this.canvas.nativeElement;
        this.context = this.canvasElement.getContext('2d');
        this.AudioOption = 'Save';
        this.videostreamRef.getTracks().map((val) => {
          this.context.drawImage(this.videoElement, 0, 0, 200, 200);
          val.stop();
        });

        break;
    }
  }


  goback() {
    if (this.settingMsg === 'Deleting...'){
      this.dialogRef.close(this.data); 
      return;
    }
    if(this.context !== null){
      //this.context.setTransform(1, 0, 0, 1, 0, 0);
      //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }    
    this.context = null;
   
      this.videostreamRef.getTracks().map((val) => {
        if(val !== null){
          this.videoElement.remove();
          val.stop();
        }
        val.stop();
      });

   
    this.dialogRef.close(this.data); 
  }

  startRecording() {
    if (this.state === RecordingState.STOPPED) {//start recording
      this.state = RecordingState.RECORDING;
      const mediaConstraints = {
        video: false,
        audio: true
      };
      navigator.mediaDevices
        .getUserMedia(mediaConstraints)
        .then(this.mediaavialable.bind(this), this.mediaerror.bind(this));
      this.seconds = 9;
      
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
