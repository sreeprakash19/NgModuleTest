import { Component, OnInit, Inject } from '@angular/core';
import { FamilydetailsService, UserInfoLogin, UserInfoLoginArray, FromDatabase } from '../../../familydetails.service';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/storage';
declare var MediaRecorder: any;

@Component({
  selector: 'app-start-null',
  templateUrl: './start-null.component.html',
  styleUrls: ['./start-null.component.css']
})
export class StartNullComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<FromDatabase>; //get  the UID from the service
  singleData: FromDatabase = {
    displayName: '',
    photoURL: '',
    phoneNumber: '',
    Gender: '',
    AnniversaryDate: '',
    BirthDate: '',
    customdisplayName: '',
    customphotoURL: '',
    GiftsBank: 0,
    downloadaudioURL: ''
  }; // make a copy before dirty
  firsttimeNodelete = false; //first time login for video
  myafterlogindata: FromDatabase;
  deleteURL = '';
  showspinner = true;
  showImage = '';
  dialogRefAudio: MatDialogRef<DialogAudioNullComponent>;
  dialogRefVideo: MatDialogRef<DialogVideoNullComponent>;

  constructor(public svc: FamilydetailsService, private afs: AngularFirestore, public dialog: MatDialog) {
    this.svc.currentMessageData.subscribe(afterlogindata => {
      if (afterlogindata !== null) {

        this.itemDoc = this.afs.doc<FromDatabase>(`testcollections/${afterlogindata.Uid}`);
        this.singleData = { ...afterlogindata };
        if (afterlogindata.customphotoURL !== '') {//old
          this.firsttimeNodelete = false;
          this.myafterlogindata = afterlogindata;
          this.deleteURL = afterlogindata.customphotoURL;
          this.showImage = this.deleteURL;

        } else {//new
          this.firsttimeNodelete = true;
          this.deleteURL = '';
          this.myafterlogindata = afterlogindata;
          this.myafterlogindata.customphotoURL = afterlogindata.photoURL;
          this.showImage = afterlogindata.photoURL;
        }
      }
    });
  }

  ngOnInit() {
  }

  dosomething() {
    this.showspinner = false;
  }

  openDialogPersonal() {

  }

  openDialogPicture() {
    this.dialogRefVideo = this.dialog.open(DialogVideoNullComponent, {
      width: '350px', disableClose: true, data: this.myafterlogindata,
      backdropClass: 'backdropBackground'
    });
    this.dialogRefVideo.afterClosed().subscribe(result => {
      console.log('closed');
    });
  }
  openDialogDates() { }
  openDialogFamily() {

  }
  openDialogGreeting() {
    this.dialogRefAudio = this.dialog.open(DialogAudioNullComponent, {
      width: '350px', disableClose: true, data: this.myafterlogindata,
      backdropClass: 'backdropBackground'
    });
    this.dialogRefAudio.afterClosed().subscribe(result => {
      console.log('closed');
    });

  }
  addfallback() {
    this.showImage = this.myafterlogindata.photoURL;
  }
  NextPage(){

  }

}

@Component({
  selector: 'dialog-audio-null',
  template: `
  <mat-card fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="10%" style = "background:gold; font-family: Lato;" >
  <h2 mat-dialog-title>
  <mat-label>{{settingMsg}}</mat-label>
  </h2>
  <div mat-dialog-content>



      <section fxFlex="0 1 75%" >
        <button mat-fab color="primary"
        (click)="initiateRecording()" [disabled]= "showRecbutton" >
        {{ state === 'recording' ? seconds : 'REC' }}</button> 
      </section>
  </div>

  <div mat-dialog-actions>
  <button mat-raised-button color ="primary" (click)="onChange()" [disabled]= "showmicrophone" >{{AudioOption}} </button>
  <button mat-raised-button  color="primary" (click)="goback()" cdkFocusInitial>Back</button>
  </div>
  </mat-card> 
`
})

export class DialogAudioNullComponent {
  seconds: number;
  state = 'Stop';
  AudioOption = 'Microphone';
  settingMsg = '';
  showmicrophone = false;
  showRecbutton = false;

  constructor(public dialogRef: MatDialogRef<DialogVideoNullComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UserInfoLogin,
              private cd: ChangeDetectorRef, private dom: DomSanitizer,
              private storage: AngularFireStorage, public svc: FamilydetailsService) {

    navigator.permissions.query({ name: 'microphone' }).then((result) => {

      if (result.state === 'granted') {
        console.log('gr');
        this.settingMsg = 'Set Voice Greeting';
        this.showmicrophone = true;
        this.showRecbutton = false;
        this.AudioOption = 'Microphone';
      } else if (result.state === 'prompt') {
        console.log('pr');
        this.settingMsg = 'Change Microphone Setting';
        this.showmicrophone = false;
        this.showRecbutton = true;
        this.AudioOption = 'Settings';
      } else if (result.state === 'denied') {
        console.log('de');
        this.settingMsg = 'Microphone Permission is Denied';
        this.showmicrophone = true;
        this.showRecbutton = true;
        this.AudioOption = 'Settings';
      }
      result.onchange = (event) => {
        if (result.state === 'granted') {
          this.cd.markForCheck();
          console.log('g- change');
          this.settingMsg = 'Set Voice Greeting';
          this.showmicrophone = true;
          this.showRecbutton = false;
          this.AudioOption = 'Microphone';
          this.cd.detectChanges();
          return;

        } else {
          if (result.state === 'denied') {
            console.log('d-change');
            this.cd.markForCheck();
            this.settingMsg = 'Microphone Permission is Denied';
            this.showmicrophone = true;
            this.showRecbutton = true;
            this.AudioOption = 'Settings';
            this.cd.detectChanges();
            return;
          } else {
            if (result.state === 'prompt') {
              this.cd.markForCheck();
              console.log('p-change');
              this.settingMsg = 'Change Microphone Setting';
              this.showmicrophone = false;
              this.showRecbutton = true;
              this.AudioOption = 'Settings';
              this.cd.detectChanges();
              return;
            }
          }
        }
      };
    });
  }
  goback() {
    this.dialogRef.close(this.data);
  }
  onChange() {
    switch (this.AudioOption) {
      case 'Microphone': {
        console.log('Goto Camera TC');
        break;
      }
      case 'Settings': {
        const mediaConstraints = {
          video: false,
          audio: true
        };
        navigator.mediaDevices
          .getUserMedia(mediaConstraints)
          .then(this.successCallback.bind(this), this.errorCallback.bind(this));
        break;
      }

    }
  }
  successCallback(stream) {
    stream.getTracks().map((val) => {
      val.stop();
    });
  }
  errorCallback() {
    alert('Uh-oh, the Microphone didn\'t start. Do you have a Microphone? Did you give it permission? Refresh to try again.');
  }
  initiateRecording() {
    console.log('Goto Record TC')
  }
}


@Component({
  selector: 'dialog-video-null',
  template: `
  <div>
  <mat-dialog-content fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="10%" style = "background:gold; font-family: Lato;">
  <mat-label>{{settingMsg}}</mat-label>
  <mat-spinner *ngIf= "showspinner"></mat-spinner>
      <section fxFlex="0 1 75%"  fxFlexAlign="center">
      
          <img mat-card-image src="{{showImage}}" (load)="dosomething()" (error)="addfallback()" alt="Photo of a User">
      </section>
  </mat-dialog-content>

  <mat-dialog-actions>
   <button mat-raised-button color ="primary" (click)="onChange()" [disabled]= "showcamera" >{{CameraOption}} </button>
  <button mat-raised-button color ="primary" (click)="onChangeImage()" [disabled]= "showcamera" >Gallery </button>
  <button mat-raised-button  color="primary" (click)="goback()" cdkFocusInitial>Back</button>
  </mat-dialog-actions> 
  </div> 
`
})

export class DialogVideoNullComponent {

  CameraOption = 'Camera';
  settingMsg = '';
  showcamera = true;
  showspinner = true;
  showImage = '';

  constructor(public dialogRef: MatDialogRef<DialogVideoNullComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UserInfoLogin,
              private cd: ChangeDetectorRef, private dom: DomSanitizer,
              private storage: AngularFireStorage, public svc: FamilydetailsService) {
    this.showImage = this.data.customphotoURL;
    navigator.permissions.query({ name: 'camera' }).then((result) => {
      if (result.state === 'granted') {
        console.log('gr');
        this.settingMsg = 'Change your profile picture';
        this.showcamera = false;
      } else if (result.state === 'prompt') {
        console.log('pr');
        this.settingMsg = 'Change Camera Setting';
        this.showcamera = false;
        this.CameraOption = 'Settings';
      } else if (result.state === 'denied') {
        console.log('de');
        this.settingMsg = 'Change Camera Setting to ON from Denied';
        this.showcamera = true;
        this.CameraOption = 'Settings';
      }
      result.onchange = (event) => {
        if (result.state === 'granted') {
          this.cd.markForCheck();
          console.log('g- change');
          this.settingMsg = 'Change your profile picture';
          this.showcamera = false;
          this.CameraOption = 'Camera';
          this.cd.detectChanges();
          return;

        } else {
          if (result.state === 'denied') {
            this.cd.markForCheck();
            console.log('d-change');
            this.settingMsg = 'Change Camera Setting to ON from Denied';
            this.showcamera = true;
            this.CameraOption = 'Settings';
            this.cd.detectChanges();
            return;
          } else {
            if (result.state === 'prompt') {
              this.cd.markForCheck();
              console.log('p-change');
              this.settingMsg = 'Change Camera Setting';
              this.showcamera = false;
              this.CameraOption = 'Settings';
              this.cd.detectChanges();
              return;
            }
          }
        }
      };
    });
  }
  goback() {
    this.dialogRef.close(this.data);
  }
  onChange() {
    switch (this.CameraOption) {
      case 'Camera': {
        console.log('Goto Camera TC');
        break;
      }


      case 'Settings': {
        const mediaConstraints = {
          video: true
        };
        navigator.mediaDevices
          .getUserMedia(mediaConstraints)
          .then(this.successCallback.bind(this), this.errorCallback.bind(this));
        break;
      }

    }
  }
  onChangeImage() {
    console.log('Go to TC');
  }
  dosomething() {
    this.showspinner = false;
  }
  successCallback(stream) {
    stream.getTracks().map((val) => {
      val.stop();
    });
  }
  errorCallback() {
    alert('Uh-oh, the webcam didn\'t start. Do you have a webcam? Did you give it permission? Refresh to try again.');
  }
  addfallback() {
    this.showImage = this.data.photoURL;
  }
}

