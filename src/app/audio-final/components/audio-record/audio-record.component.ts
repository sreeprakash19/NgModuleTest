import { Component, OnInit, Inject } from '@angular/core';
import { UserService, UserAudioLogin, AfterVideoData, MyAfterVideoData } from '../../../user.service';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
declare var MediaRecorder: any;

@Component({
  selector: 'app-audio-record',
  templateUrl: './audio-record.component.html',
  styleUrls: ['./audio-record.component.css']
})
export class AudioRecordComponent implements OnInit {
  myafterlogindata: UserAudioLogin;
  private itemDoc: AngularFirestoreDocument<MyAfterVideoData>;
  singleData: AfterVideoData = {
    displayName: '',
    photoURL: '',
    phoneNumber: '',
    Gender: '',
    AnniversaryDate: '',
    BirthDate: '',
    customdisplayName: '',
    customphotoURL: '',
    GiftsBank: 0,
    customaudioURL: ''
  };
  firsttimeNodelete = false;
  deleteURL = '';
  showspinner = true;
  MultipleData: Array<UserAudioLogin> = [];
  demoForm = this.formBuilder.group({
    profileData: this.formBuilder.array([])
  });
  dialogRefAudio: MatDialogRef<DialogAfterAudio>;
  constructor(public svc: UserService, private afs: AngularFirestore, public dialog: MatDialog,
    public formBuilder: FormBuilder, ) {
    this.svc.currentAfterVideoLogin.subscribe(afterlogindata => {
      this.itemDoc = this.afs.doc<MyAfterVideoData>(`testcollections/${afterlogindata.Uid}`);
      this.singleData.displayName = afterlogindata.displayName;
      this.singleData.photoURL = afterlogindata.photoURL;
      this.singleData.phoneNumber = afterlogindata.phoneNumber;
      this.singleData.Gender = afterlogindata.Gender;
      this.singleData.AnniversaryDate = afterlogindata.AnniversaryDate;
      this.singleData.BirthDate = afterlogindata.BirthDate;
      this.singleData.customdisplayName = afterlogindata.customdisplayName;
      this.singleData.customphotoURL = afterlogindata.customphotoURL;
      this.singleData.GiftsBank = afterlogindata.GiftsBank;
      this.singleData.customaudioURL = afterlogindata.customaudioURL;

      if (afterlogindata.customphotoURL !== '') {//old
        this.firsttimeNodelete = false;
        this.myafterlogindata = afterlogindata;
        this.deleteURL = afterlogindata.customphotoURL;
      } else {//new
        this.firsttimeNodelete = true;
        this.myafterlogindata = afterlogindata;
        this.myafterlogindata.customphotoURL = afterlogindata.photoURL;
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
  }
  openDialogDates() { }
  openDialogFamily() {

  }
  openDialogGreeting() {
    this.dialogRefAudio = this.dialog.open(DialogAfterAudio, {
      width: '350px', disableClose: true, data: this.myafterlogindata,
      backdropClass: 'backdropBackground'
    });
    /*if(this.singleData.customaudioURL === "" ){
      this.dialogRefAudio= this.dialog.open(DialogAfterAudio, { width: '350px', disableClose: true, data: this.myafterlogindata });

    } else {
        const dialogRef1 = this.dialog.open(DialogAfterOldAudio, { width: '350px', disableClose: true, data: this.myafterlogindata });
        dialogRef1.afterClosed().subscribe(myresult => {

          if(myresult === true){
            const dialogRefchange = this.dialog.open(DialogAfterAudio, { width: '350px', disableClose: true, data: this.myafterlogindata });
            dialogRefchange.afterClosed().subscribe(resultchanged => {
              this.myafterlogindata.customphotoURL = resultchanged;
              this.MultipleData[0] = this.myafterlogindata;
              const profileFormGroups = this.MultipleData.map(details => this.formBuilder.group(details));
              const profileFormArray = this.formBuilder.array(profileFormGroups);
              this.demoForm.setControl('profileData', profileFormArray);
              this.demoForm.get('profileData').patchValue(this.MultipleData);
              this.itemDoc.update(this.demoForm.value);
              this.svc.AfterLoginUpdate(this.myafterlogindata);
            });
          }

        });
    }*/
    this.dialogRefAudio.afterClosed().subscribe(result => {
      console.log('closed');

    });
  }

  NextPage() { }

}

export enum RecordingState {
  STOPPED = 'stopped',
  RECORDING = 'recording',
  FORBIDDEN = 'forbidden',
}
//https://stackblitz.com/edit/countdown-timer-demo?file=app%2Fcountdown-timer%2Fcountdown-timer.component.ts
@Component({
  selector: 'dialog-aftervideo-audio',
  template: `

  <mat-card fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="10%" style = "background:gold; font-family: Lato;" >
  <mat-label *ngIf = "!isclipavailable">Record 10sec Voice Greeting </mat-label>
  <mat-label *ngIf = "isblocked">Browser Settings -> Advanced -> privacy & Security -> Site Setting -> Unblock Microphone  </mat-label>

  <button mat-raised-button color="primary" *ngIf = "isSettingON" (click)="clickperm()">Switch ON Microphone</button>
  <button mat-fab color="primary"
  (click)="initiateRecording()" *ngIf ="!isDisabled">
{{ state === 'recording' ? seconds : 'REC' }}</button> 
  <mat-label *ngIf = "isclipavailable">Set the New Voice Greeting </mat-label>
  <audio *ngFor="let audio of audioFiles" controls='true' [src]="audio">

  </audio>
  <div mat-dialog-actions>
  <button mat-raised-button color="primary" *ngIf = "isclipavailable" (click)="saveAudio()" >{{usraction}}</button>
  <button mat-raised-button  color="primary" (click)="goback()">{{stoprec}}</button>
  </div>
</mat-card>
`
})
//pr- true/false
//isDisabled??
//isblocked??
export class DialogAfterAudio implements OnInit {

  imageFile: any;
  stoprec = 'back';
  isclipavailable = false;
  isblocked = false;
  isDisabled = false;
  isSettingON = false;
  usraction = 'Save';
  mediaRecorder: any;
  chunks = [];
  audioFiles = [];
  recordedChunks = [];
  state: RecordingState;
  seconds: number;
  //Will use this flag for detect recording
  private recording = false;

  //Lets initiate Record OBJ
  private record;

  private error;
  private url;

  intervalId = 0;
  //seconds = 11;
  streamRef: any;
  constructor(public dialogRef: MatDialogRef<DialogAfterAudio>,
              @Inject(MAT_DIALOG_DATA) public data: UserAudioLogin,
              private cd: ChangeDetectorRef, private dom: DomSanitizer,
              private storage: AngularFireStorage, public svc: UserService) {
    this.state = RecordingState.STOPPED;
    navigator.permissions.query({ name: 'microphone' }).then((result) => {
      if (result.state === 'granted') {
        console.log('gr');
        this.isDisabled = false;
        this.isSettingON = false;
        this.isblocked = false;
      } else if (result.state === 'prompt') {
        console.log('pr');
        this.isDisabled = true;
        this.isSettingON = true;
        this.isblocked = false;
      } else if (result.state === 'denied') {
        console.log('de');
        this.isDisabled = true;
        this.isblocked = true;
        this.isSettingON = false;
      }
      result.onchange = (event) => {
        if (result.state === 'granted') {
          console.log('g');
          this.isblocked = false;
          this.isDisabled = false;
          this.isSettingON = false;
        } else {
          if (result.state === 'denied') {
            console.log('p');
            this.isDisabled = true;
            this.isblocked = false;
            this.isSettingON = false;
          }
        }
      };
    });
  }
  onchange() {
    console.log('c');
  }

  clickperm() {
    this.recording = true;
    const mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints);
  }
  ngOnInit() {


  }

  saveAudio() {
    if(this.usraction === 'Delete'){
      this.isclipavailable = false;
      this.audioFiles.pop();
      this.usraction = 'Save';
      this.storage.storage.refFromURL(this.data.customaudioURL).delete();      
    } else{

    
    const date = new Date().valueOf();
    let text = '';
    const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
    }
    this.storage.upload(`audio/${new Date().getTime()}_${text}`, this.imageFile).then(uploadstat => {
      if (uploadstat != null) {
        console.group(uploadstat.ref.fullPath);
        uploadstat.ref.getDownloadURL().then(downloadURL => {
          this.data.customaudioURL = downloadURL;
          console.log('downloadURL', downloadURL);
          this.svc.AfterVideoideo(this.data);
          this.usraction = 'Delete';
        });
      }
    }).catch(error => {
      //retry save
    });

  }
    
  }
  goback() {
    if (this.stoprec === 'stop Recording') {
      //this.mediaRecorder.stop();

      this.state = RecordingState.STOPPED;
      this.seconds = 9;
      this.clearTimer();
      this.mediaRecorder.stop();
      this.isDisabled = true;
      this.stoprec = 'back';

    } else {
      this.dialogRef.close(this.data);
    }
  }

  clearTimer() {
    clearInterval(this.intervalId);
  }
  initiateRecording() {
    if (this.state === RecordingState.STOPPED) {
      const mediaConstraints = {
        video: false,
        audio: true
      };
      navigator.mediaDevices
        .getUserMedia(mediaConstraints)
        .then(this.successCallback.bind(this), this.errorCallback.bind(this));
      this.seconds = 9;
      this.state = RecordingState.RECORDING;
      this.clearTimer();
      this.intervalId = window.setInterval(() => {
        this.seconds -= 1;
        if (this.seconds === 0) {
          this.state = RecordingState.STOPPED;
          this.mediaRecorder.stop();
          this.isDisabled = true;
          this.stoprec = 'back';
          this.streamRef.getTracks().map((val) => {
            //val.stop();
            return;
          });

        }
      }, 1000);


    } else {
      this.state = RecordingState.STOPPED;
      this.seconds = 9;
      this.clearTimer();
      this.mediaRecorder.stop();
      this.isDisabled = true;
      this.stoprec = 'back';
      this.streamRef.getTracks().map((val) => {
        //val.stop();
      });
    }

  }

  successCallback(stream) {
    this.mediaRecorder = new MediaRecorder(stream);
    this.streamRef = stream;
    this.mediaRecorder.start();
    this.stoprec = 'stop Recording';
    this.mediaRecorder.onstop = e => {
      console.log('data available after MediaRecorder.stop() called.');

      // audio.controls = true;
      const blob = new Blob(this.chunks, { type: 'audio/ogg; codecs=opus' });
      const date = new Date().valueOf();
      let text = '';
      const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
        text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
      }
      // Replace extension according to your media type like this 
      const imageName = date + '.' + text + '.jpeg';
      this.imageFile = new File([blob], imageName, { type: 'audio/ogg; codecs=opus' });
      this.chunks.pop();
      const audioURL = URL.createObjectURL(blob);
      // audio.src = audioURL;
      this.audioFiles.push(this.dom.bypassSecurityTrustUrl(audioURL));
      console.log(audioURL);
      console.log('recorder stopped');
      this.cd.detectChanges();
    };
    this.mediaRecorder.ondataavailable = e => {
      this.isclipavailable = true;
      this.stoprec = 'back';
      this.chunks.push(e.data);
      this.recordedChunks.push(e.data);
    };
  }
  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }
}

@Component({
  selector: 'dialog-aftervideo-oldaudio',
  template: `

  <div fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="10%" >
  <mat-label> Play the Recoreded Clip </mat-label>

  <audio *ngFor="let audio of audioFiles" controls='true' [src]="audio">
  
  </audio>
  <div mat-dialog-actions>
  <button (click)="replaceAudio()">{{usraction}}</button>
  <button (click)="goback()">{{stoprec}}</button>
  </div>
</div>
`
})
//pr- true/false
//isDisabled??
//isblocked??
export class DialogAfterOldAudio implements OnInit {

  stoprec = 'back';
  usraction = 'Record Greeting';
  audioFiles = [];

  constructor(public dialogRef: MatDialogRef<DialogAfterOldAudio>,
    @Inject(MAT_DIALOG_DATA) public data: UserAudioLogin) {

  }
  ngOnInit() {
    this.audioFiles.push(this.data.customaudioURL);

  }
  goback() {
    this.dialogRef.close(false);
  }
  replaceAudio() {
    this.dialogRef.close(true);
  }
}
