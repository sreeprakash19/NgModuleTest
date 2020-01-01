import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/storage';
declare var MediaRecorder: any;

export enum RecordingState {
  STOPPED = 'stopped',
  RECORDING = 'recording',
  FORBIDDEN = 'forbidden',
}

@Component({
  selector: 'app-image-record',
  templateUrl: './image-record.component.html',
  styleUrls: ['./image-record.component.css']
})
export class ImageRecordComponent implements OnInit, AfterContentInit {
  showRecbutton = true;
  disableRecbutton = false;
  showRecording = false;
  showDeletebutton = false;
  showSave = false;
  recstate: RecordingState;
  seconds: number;
  intervalId = 0;
  mediaRecorder: any;
  streamRef: any;
  imageFile: any;
  chunks = [];
  audioFiles = [];

  showspinner = true;
  videoElement: HTMLVideoElement;
  videostreamRef: any;
  showPicButton = true;
  showcanvas = false;
  canvasElement: any;
  context: any;
 
  @ViewChild('video', { static: true }) video: any;
  @ViewChild('canvas', { static: true }) canvas: any;
  constructor(private cd: ChangeDetectorRef, private dom: DomSanitizer,
    private storage: AngularFireStorage) {
    this.recstate = RecordingState.STOPPED;

  }

  goback() {
    console.log('Close Dialog');
    //this.dialogRef.close(this.data);
  }
  onChange() {
    this.recstate = RecordingState.STOPPED;
    this.showRecording = false;
    this.showDeletebutton = true;
    this.showSave = true;
    this.showRecbutton = false;
    this.seconds = 9;
    this.clearTimer();
    this.mediaRecorder.stop();
  }



  onDelete() {//Becomes new user
    this.audioFiles.pop();
    this.showRecording = false;
    this.showDeletebutton = false;
    this.showSave = false;
    this.showRecbutton = true;
    console.log('Go to state 1');
  }

  initiateRecording() {
    //Added New - console.log('Goto Record TC')
    if (this.recstate === RecordingState.STOPPED) {
      this.recstate = RecordingState.RECORDING;
      this.showRecording = true;
      this.recstate = RecordingState.RECORDING;
      const mediaConstraints = {
        video: false,
        audio: true
      };
      navigator.mediaDevices
        .getUserMedia(mediaConstraints)
        .then(this.successRecord.bind(this), this.errorRecord.bind(this));
      this.seconds = 9;
      this.clearTimer();
      this.intervalId = window.setInterval(() => {
        this.seconds -= 1;
        if (this.seconds === 0) {
          this.mediaRecorder.stop();
          this.streamRef.getTracks().map((val) => {
            this.recstate = RecordingState.STOPPED;
            //val.stop();
            return;
          });

        }
      }, 1000);
    }
    else {
      this.recstate = RecordingState.STOPPED;
      this.showRecording = false;
      this.showDeletebutton = true;
      this.showSave = true;
      this.showRecbutton = false;
      this.seconds = 9;
      this.clearTimer();
      this.mediaRecorder.stop();
    }

  }
  successRecord(stream) {
    this.mediaRecorder = new MediaRecorder(stream);
    this.streamRef = stream;
    this.mediaRecorder.start();

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
      this.chunks = [];
      const audioURL = URL.createObjectURL(blob);
      // audio.src = audioURL;
      this.audioFiles.push(this.dom.bypassSecurityTrustUrl(audioURL));
      console.log(audioURL);
      console.log('recorder stopped');
      this.cd.detectChanges();
    };
    this.mediaRecorder.ondataavailable = e => {
      this.chunks.push(e.data);
    };
  }
  errorRecord() {

  }
  clearTimer() {
    clearInterval(this.intervalId);
  }
  onSave() {
    console.log('Save TC');
  }

  saveAudio() {

    const date = new Date().valueOf();
    let text = '';
    const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
    }
    this.storage.upload(`audio/${new Date().getTime()}_${text}`, this.imageFile).then(uploadstat => {
      if (uploadstat != null) {
        uploadstat.ref.getDownloadURL().then(downloadURL => {
          console.log('downloadURL', downloadURL);
          //save it in DB
          // Delete the old Clip
          // Modify UI
        });
      }
    }).catch(error => {
      //retry save
    });
  }

  AfterVideoLoad() {
    this.showspinner = false;
  }
  ngAfterContentInit(){
    this.canvas.nativeElement.style.display = 'none';
  }
  ngOnInit() {
    
    this.canvasElement = this.canvas.nativeElement;
    this.context = this.canvasElement.getContext('2d');
    this.videoElement = this.video.nativeElement;
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 200, height: 200, facingMode: 'user', aspectRatio: .5 }
      })
      .then(stream => {
        this.videoElement.srcObject = stream;
        this.videostreamRef = stream;
      });
      //this.canvas = document.querySelector('canvas');

      

  
  }

  takePicture() {
    this.showcanvas= true;
    this.canvas.nativeElement.style.display = 'block';
    this.showPicButton = false;
    this.videostreamRef.getTracks().map((val) => {
      this.context.drawImage(this.videoElement, 0, 0, 200, 200);
      val.stop();
      this.videoElement.srcObject = null; 
      this.videoElement.remove();
      //this.video = null;
      
    });
  }

}
