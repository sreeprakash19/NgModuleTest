import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FamilydetailsService, UserInfoLogin, UserInfoLoginArray } from '../familydetails.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
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
  dialogRefAudio: MatDialogRef<DialogAudioComponent>;

  constructor(public svc: FamilydetailsService, public dialog: MatDialog) {
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
  openDialogGreeting() {
    this.dialogRefAudio = this.dialog.open(DialogAudioComponent, {
      width: '350px', disableClose: true, data: this.myafterlogindata,
      backdropClass: 'backdropBackground'
    });
    this.dialogRefAudio.afterClosed().subscribe(result => {
      this.svc.AfterLoginSend(result);//tmp
      console.log('closed');
    });

  }
  NextPage() { }
  dosomething() {
    this.showspinner = false;
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
      (click)="initiateRecording()" [disabled]= "disablemicrophone" >
      {{ state === 'recording' ? seconds : 'REC' }}</button> 
    </section>
  </div>
  <mat-spinner *ngIf= "showspinner"></mat-spinner>
  <div mat-dialog-actions>
  <button mat-raised-button color ="primary" (click)="onChange()" *ngIf="showbutton" [disabled]= "disablebutton" >{{AudioOption}} </button>
  <button mat-raised-button  color="primary" (click)="goback()" cdkFocusInitial>Back</button>
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
  savetoDB: UserInfoLoginArray;
  private itemDoc: AngularFirestoreDocument<UserInfoLoginArray>;

  intervalId = 0;
  mediaRecorder: any;
  streamRef: any;
  chunks = [];
  imageFile: any;
  private error;
  storageRef: any;

  constructor(public dialogRef: MatDialogRef<DialogAudioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfoLogin, private cd: ChangeDetectorRef,
    private storage: AngularFireStorage, private afs: AngularFirestore, private dom: DomSanitizer) {
    this.state = RecordingState.STOPPED;
    this.savetoDB = { ... this.data };
    this.itemDoc = this.afs.doc<UserInfoLoginArray>(`testcollections/${this.data.Uid}`);

    //this.itemDoc =this.afs.collection('testcollections').doc(`${this.data.Uid}`);
    if (data.downloadaudioURL != null) {
      this.settingMsg = 'Play your Voice Greeting';
      this.showmicrophone = false;
      this.showbutton = true;
      this.AudioOption = 'Delete';
      this.audioFiles.push(this.data.downloadaudioURL);

    } else {
      this.checkpermissions();
    }

  }
  checkpermissions() {
    navigator.permissions.query({ name: 'microphone' }).then((result) => {

      if (result.state === 'granted') {
        console.log('gr');
        this.settingMsg = 'Set your Voice Greeting';
        this.showmicrophone = true;
        this.disablemicrophone = false;
        this.showbutton = false;
        this.AudioOption = '';
      } else if (result.state === 'prompt') {
        console.log('pr');
        this.settingMsg = 'Set Microphone settings';
        this.showmicrophone = true;
        this.disablemicrophone = true;
        this.showbutton = true;
        this.AudioOption = 'Settings';
      } else if (result.state === 'denied') {
        console.log('de');
        this.settingMsg = 'Microphone setting is Denied';
        this.showmicrophone = false;
        this.disablemicrophone = true;
        this.showbutton = false;
        this.AudioOption = '';
      }
      result.onchange = (event) => {
        if (result.state === 'granted') {
          //this.cd.markForCheck();
          console.log('g- change');
          this.settingMsg = 'Set your Voice Greeting';
          this.showmicrophone = true;
          this.disablemicrophone = false;
          this.showbutton = false;
          this.AudioOption = '';
          //this.cd.detectChanges();
          return;

        } else {
          if (result.state === 'denied') {
            console.log('d-change');
            //this.cd.markForCheck();
            console.log('d-change');
            this.settingMsg = 'Microphone setting is Denied';
            this.showmicrophone = false;
            this.disablemicrophone = true;
            this.showbutton = false;
            this.AudioOption = '';
            //this.cd.detectChanges();
            return;
          } else {
            if (result.state === 'prompt') {
              //this.cd.markForCheck();
              console.log('p-change');
              this.settingMsg = 'Set Microphone settings';
              this.showmicrophone = true;
              this.disablemicrophone = true;
              this.showbutton = true;
              this.AudioOption = 'Settings';
              //this.cd.detectChanges();
              return;
            }
          }
        }
      };
    });
  }
  connectionerror() {
    this.disablebutton = true;
    alert('Uh-oh, Connection Issue, Check Internet connection');
  }
  onChange() {
    switch (this.AudioOption) {

      case 'Delete': {
        //first always check if the storage is valid.
        this.settingMsg = 'Deleting...';
        this.showbutton = false;          
        this.showspinner = true;
        this.storageRef = this.storage.storage.refFromURL(this.data.downloadaudioURL).getDownloadURL().then(url => {
          console.log('Greeting present in storage');
          this.storage.storage.refFromURL(this.data.downloadaudioURL).delete().then(success => {
            console.log('Deleted form storage');
            const ref = this.afs.firestore.collection('testcollections').doc(`${this.data.Uid}`);
            
            this.afs.firestore.runTransaction(transaction =>
              transaction.get(ref).then(sfdoc => {
                this.savetoDB = sfdoc.data() as UserInfoLoginArray;
                this.savetoDB.downloadaudioURL = '';
                transaction.update(ref, this.savetoDB);
              })
            ).then(successtran => {//update in DB done
              console.log('deleted in DB');
              this.audioFiles.pop();
              this.data.downloadaudioURL = '';
              this.checkpermissions();
              this.showspinner = false;
            }).catch(error => {//DB update fail due to internet failure in 20 sec
              console.log('Deleted Failed in DB');
              this.showspinner = false;
              //this.audioFiles.push(this.data.downloadaudioURL);
              this.showbutton = true;
              alert('Uh-oh, Connection Issue, Try Again');
              this.settingMsg = 'Play your Voice Greeting';
              //alert is taken care
            });
  
          }).catch(error => {//reaches here after solid 1 min
  
            this.showspinner = false;
            this.showbutton = true;
            //this.audioFiles.push(this.data.downloadaudioURL);
            this.settingMsg = 'Play your Voice Greeting';
            alert('Uh-oh, Connection Issue, Try Again');
            //alert is taken care
          });
          
        }).catch(error => {
          console.log('Deleted Failed in storage');
          this.settingMsg = 'Retry Deleting...';
          this.showbutton = false;          
          this.showspinner = true;
          const refagin = this.afs.firestore.collection('testcollections').doc(`${this.data.Uid}`);
          this.afs.firestore.runTransaction(transaction =>
            transaction.get(refagin).then(sfdoc => {
              this.savetoDB = sfdoc.data() as UserInfoLoginArray;
              this.savetoDB.downloadaudioURL = '';
              transaction.update(refagin, this.savetoDB);
            })
          ).then(successtran => {//update in DB done
            console.log('Retry Deleted in DB');
            this.data.downloadaudioURL = '';
            this.checkpermissions();
            this.showspinner = false;
            this.showbutton = false;
            this.audioFiles.pop();
          }).catch(error => {
            console.log('Retry Deleted Failed in DB');
            this.showspinner = false;
            this.showbutton = true;
            //this.audioFiles.push(this.data.downloadaudioURL);
            this.settingMsg = 'Play your Voice Greeting';

          });
        });
        break;
    }
      case 'Settings': {
      return;
    }
  }
}
goback() {
  this.audioFiles.pop();
  this.dialogRef.close(this.data);
}
initiateRecording() {
  if (this.state === RecordingState.STOPPED) {
    this.settingMsg = 'Recording your Greeting';
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
        this.settingMsg = 'Newly Recorded Greeting';
        this.streamRef.getTracks().map((val) => {
          val.stop();
          return;
        });

      }
    }, 1000);


  } else {
    this.state = RecordingState.STOPPED;
    this.mediaRecorder.stop();
    this.settingMsg = 'Newly Recorded Greeting';
    this.seconds = 9;
    this.clearTimer();
    this.streamRef.getTracks().map((val) => {
      val.stop();
    });
  }
}
clearTimer() {
  clearInterval(this.intervalId);
}
successCallback(stream) {
  this.mediaRecorder = new MediaRecorder(stream);
  this.streamRef = stream;
  this.mediaRecorder.start();

  this.mediaRecorder.onstop = e => {
    const blob = new Blob(this.chunks, { type: 'audio/ogg; codecs=opus' });
    const date = new Date().valueOf();
    let text = '';
    const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
    }
    const imageName = date + '.' + text + '.jpeg';
    this.imageFile = new File([blob], imageName, { type: 'audio/ogg; codecs=opus' });
    this.chunks.pop();
    const audioURL = URL.createObjectURL(blob);
    const reference = this.afs.firestore.collection('testcollections').doc(`${this.data.Uid}`);
    //audio/${new Date().getTime()}_${text}
    this.storage.upload(`audio/${this.data.Uid}`, this.imageFile).then(uploadstat => {
      if (uploadstat != null) {
        uploadstat.ref.getDownloadURL().then(downloadURL => {
          this.afs.firestore.runTransaction(transaction =>
            transaction.get(reference).then(sfdoc => {
              this.savetoDB = { ...sfdoc.data().profileData[0] };
              transaction.update(reference, { profileData: firestore.FieldValue.arrayRemove(this.savetoDB) });
              this.savetoDB.downloadaudioURL = downloadURL;
              transaction.update(reference, { profileData: firestore.FieldValue.arrayUnion(this.savetoDB) });
            })
          ).then(successdb => {
            this.showmicrophone = false;
            this.disablemicrophone = false;
            this.showbutton = true;
            this.settingMsg = 'Play your Voice Greeting';
          }).catch(error => {
            this.showmicrophone = true;
            this.disablemicrophone = false;
            this.showbutton = false;
            this.settingMsg = 'Set Voice Greeting';
            this.audioFiles.pop();
          });

        });
      }
    });


    this.audioFiles.push(this.dom.bypassSecurityTrustUrl(audioURL));

    this.cd.detectChanges();
  };
  this.mediaRecorder.ondataavailable = e => {
    this.chunks.push(e.data);
  };
}
errorCallback(error) {
  this.error = 'Can not play audio in your browser';
}

}



/*this.afs.firestore.runTransaction( transaction =>
  transaction.get(ref).then(sfdoc => {
    this.savetoDB = {...sfdoc.data().profileData[0]};
    transaction.update(ref, {profileData: firestore.FieldValue.arrayRemove(this.savetoDB) } );
    this.savetoDB.downloadaudioURL = 'here';
    transaction.update(ref, {profileData: firestore.FieldValue.arrayUnion(this.savetoDB) } );
  })*/


/*
this.settingMsg = 'Deleting...';
this.showbutton = false;
const ref = this.afs.firestore.collection('testcollections').doc(`${this.data.Uid}`);
const refe = this.afs.firestore.collection('testcollections').doc(`${this.data.Uid}`);
ref.update(
{deleteStarted: true}

).then(successdb => {

this.storage.storage.refFromURL(this.data.downloadaudioURL).delete().then(success => {
  this.audioFiles.pop();
  this.showspinner = true;
  refe.update(
    {deleteStarted: false, downloadaudioURL: '', audiofullpath: ''}).then(successdbfinish => {

      this.data.downloadaudioURL = '';
      this.savetoDB.downloadaudioURL = '';
      this.checkpermissions();
      this.showspinner = false;
    }).catch(error => {
      alert('Uh-oh, Connection Issue, Try Again');
      this.dialogRef.close(this.data);
    });
}).catch(error => {
  this.showspinner = false;
  this.showbutton = true;
  this.audioFiles.push(this.data.downloadaudioURL);
  this.settingMsg = 'Play your Voice Greeting';
  alert('Uh-oh, Connection Issue, Try Delete Again');
  return;
});
}).catch(error => {
this.showspinner = false;
this.showbutton = true;
alert('Uh-oh, Connection Issue, Try Delete Again');
this.settingMsg = 'Play your Voice Greeting';
return;
});
return;
}
case 'Settings': {
return;
}
*/