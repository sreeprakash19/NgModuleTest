import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { UserService, UserInfoLogin, DialogData, MyUserData} from '../../../user.service';
import {MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-newuser-traverse',
  templateUrl: './newuser-traverse.component.html',
  styleUrls: ['./newuser-traverse.component.css']
})
export class NewuserTraverseComponent implements OnInit {
  demoForm = this.formBuilder.group({
    profileData: this.formBuilder.array([])
  });
  myafterlogindata: UserInfoLogin; 
  showspinner = true;
  private itemDoc: AngularFirestoreDocument<MyUserData>;
  singleData: DialogData = {
    displayName: '',
    photoURL: '',
    phoneNumber: '',
    Gender: '',
    AnniversaryDate: '',
    BirthDate: '',
    customdisplayName: '',
    customphotoURL: '',
    GiftsBank: 0
  };
  MultipleData : Array<DialogData> = [];
  constructor(public svc: UserService, private bottomSheet: MatBottomSheet, private afs: AngularFirestore,
              public formBuilder: FormBuilder, public dialog: MatDialog) {
    
    this.svc.currentMessageDataLogin.subscribe( afterlogindata => {      
      this.itemDoc = this.afs.doc<MyUserData>(`testcollections/${afterlogindata.Uid}`);
      this.singleData.displayName = afterlogindata.displayName;
      this.singleData.photoURL = afterlogindata.photoURL;
      this.singleData.phoneNumber= afterlogindata.phoneNumber;
      this.singleData.Gender= afterlogindata.Gender;
      this.singleData.AnniversaryDate= afterlogindata.AnniversaryDate;
      this.singleData.BirthDate= afterlogindata.BirthDate;
      this.singleData.customdisplayName= afterlogindata.customdisplayName;
      this.singleData.customphotoURL= afterlogindata.customphotoURL;
      this.singleData.GiftsBank= afterlogindata.GiftsBank;

      if (afterlogindata.customphotoURL !== '' ){
        this.myafterlogindata = afterlogindata;
        

      } else{
        this.myafterlogindata = afterlogindata;
        this.myafterlogindata.customphotoURL = afterlogindata.photoURL;        
      }
    });
   }

  ngOnInit() {
  }
  dosomething(){
    this.showspinner = false;
  }

  openDialogPersonal() {
    const bottomSheetRef = this.bottomSheet.open(BottomSheetPersonal, {disableClose: true,  data: this.myafterlogindata});
    bottomSheetRef.afterDismissed().subscribe( myreturn => {
      console.log('after close', myreturn);
      if(myreturn !== undefined){
        this.myafterlogindata = myreturn;
        this.svc.AfterLoginUpdate(myreturn);
        this.singleData.displayName = this.myafterlogindata.displayName;
        this.singleData.photoURL = this.myafterlogindata.photoURL;
        this.singleData.phoneNumber= this.myafterlogindata.phoneNumber;
        this.singleData.Gender= this.myafterlogindata.Gender;
        this.singleData.AnniversaryDate= this.myafterlogindata.AnniversaryDate;
        this.singleData.BirthDate= this.myafterlogindata.BirthDate;
        this.singleData.customdisplayName= this.myafterlogindata.customdisplayName;
        this.singleData.customphotoURL= this.myafterlogindata.customphotoURL;
        this.singleData.GiftsBank= this.myafterlogindata.GiftsBank;
        this.MultipleData[0] = this.myafterlogindata;
        const profileFormGroups = this.MultipleData.map(details => this.formBuilder.group(details));
        const profileFormArray = this.formBuilder.array(profileFormGroups);
        this.demoForm.setControl('profileData', profileFormArray);
        this.demoForm.get('profileData').patchValue(this.MultipleData);
        this.itemDoc.update(this.demoForm.value);
      }      
    });
  }

  openDialogPicture(){
    const bottomSheetRef = this.bottomSheet.open(BottomSheetPicture, {disableClose: true,  data: this.myafterlogindata});
    bottomSheetRef.afterDismissed().subscribe( myreturn => {
      if(myreturn === true){
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '350px';
        
        const dialogRef = this.dialog.open(BottomSheetVideo, {width: '350px', disableClose: true,  data: this.myafterlogindata});
    
        dialogRef.afterClosed().subscribe( result => {
          if(result !== null){
            this.myafterlogindata = result;
            this.svc.AfterLoginUpdate(result);
            this.singleData.displayName = this.myafterlogindata.displayName;
            this.singleData.photoURL = this.myafterlogindata.photoURL;
            this.singleData.phoneNumber= this.myafterlogindata.phoneNumber;
            this.singleData.Gender= this.myafterlogindata.Gender;
            this.singleData.AnniversaryDate= this.myafterlogindata.AnniversaryDate;
            this.singleData.BirthDate= this.myafterlogindata.BirthDate;
            this.singleData.customdisplayName= this.myafterlogindata.customdisplayName;
            this.singleData.customphotoURL= this.myafterlogindata.customphotoURL;
            this.singleData.GiftsBank= this.myafterlogindata.GiftsBank;
            this.MultipleData[0] = this.myafterlogindata;
            const profileFormGroups = this.MultipleData.map(details => this.formBuilder.group(details));
            const profileFormArray = this.formBuilder.array(profileFormGroups);
            this.demoForm.setControl('profileData', profileFormArray);
            this.demoForm.get('profileData').patchValue(this.MultipleData);
            this.itemDoc.update(this.demoForm.value);
          }
          
        });
      }
      else{

      }
    });
  }
}

@Component({
  selector: 'bottom-sheet-personal',
  template : `

  <form [formGroup]="mydemoForm" fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="10%">
    <mat-form-field>
    <mat-label>Modify Display Name</mat-label>
    <input matInput formControlName ="customdisplayName" style = "background-color:cornflowerblue;" >
    </mat-form-field>

    <mat-form-field>
    <mat-label>Modify Phone Number</mat-label>
    <input matInput formControlName ="phoneNumber" style = "background-color:cornflowerblue;" >
    </mat-form-field>

    <mat-form-field>
    <mat-label>Modify Gender</mat-label>
    <input matInput formControlName ="Gender" style = "background-color:cornflowerblue;" >
    </mat-form-field>


    <button mat-raised-button (click)="onNoClick()" cdkFocusInitial>Clear</button>
    <button mat-raised-button (click)="savesheet()">Save</button>
    <button mat-raised-button (click)="closesheet()">close</button>

  </form>

  `
})
export class BottomSheetPersonal {
  mydemoForm: FormGroup;
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetPersonal>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: UserInfoLogin,
              public formBuilder: FormBuilder ) {
                console.log('received data', data );
                this.mydemoForm = this.formBuilder.group({
                  displayName: this.data.displayName,
                  phoneNumber: this.data.phoneNumber,
                  photoURL: this.data.photoURL,
                  Gender: this.data.Gender,
                  AnniversaryDate: this.data.AnniversaryDate,
                  BirthDate: this.data.BirthDate,
                  customdisplayName: this.data.customdisplayName,
                  customphotoURL: this.data.customphotoURL,
                  GiftsBank: this.data.GiftsBank
                });
              }

  onNoClick(): void {
    this.mydemoForm.reset();
  }
  savesheet(){
    this.bottomSheetRef.dismiss(this.mydemoForm.value);
  }
  closesheet(){
    this.bottomSheetRef.dismiss();
  }
}

@Component({
  selector: 'bottom-sheet-picture',
  template : `
  <div mat-dialog-content>
      <h2> {{this.displaynamedialog}} </h2>
      <section>
        <mat-slide-toggle
            [(ngModel)]="checked"
            (change)="onChange()"
            [color]= "accent"
            [checked]="false"
            [disabled]="false">
          Use Camera
        </mat-slide-toggle>
      </section>
      <section>
      <mat-card>
      <mat-spinner *ngIf= "showspinner"></mat-spinner>
      <img mat-card-image style= "max-height: 40vh" src="{{data?.customphotoURL}}" (load)="dosomething()" alt="Photo of a User">
      </mat-card>
      </section>
</div>
 
  <div mat-dialog-actions>
    <button mat-raised-button color = "warn" (click)="close()" cdkFocusInitial> Close </button>
    <button mat-raised-button color = "primary" (click)="save()"> Save </button>
  </div>

  `
})
export class BottomSheetPicture {
  displaynamedialog: string;
  neworolduser: boolean;
  myphotourl: string;
  mycustomurl: string;
  checked = false;
  showspinner = true;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  private context: CanvasRenderingContext2D;
  base64Image: any;

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetPicture>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: UserInfoLogin) {
         //second time onwards
        this.displaynamedialog = 'Do you want to change the profile picture?';
    }
    dosomething(){
      this.showspinner = false;
    }

    close(){
      this.bottomSheetRef.dismiss(false);
    }

    onChange() {
      if (this.checked === true) {
        this.bottomSheetRef.dismiss(true);
      }
    }


}

@Component({
  selector: 'bottom-sheet-video',
  template : `
  <div fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="10%" >
    <mat-spinner *ngIf="showspinner"></mat-spinner>
    <video #video autoplay playsinline (durationchange)="dosomething()" ></video>
    <button (click)="takePicture()">Take Picture</button>
    <canvas #canvas id="canvas" width="200" height="200" style="border:1px solid #d3d3d3;"></canvas>

    <div mat-dialog-actions>
    <button (click)="savePicture()">Save Picture</button>
    <button (click)="goback()">Back</button>
    </div>
</div>
`
})
export class BottomSheetVideo {
  canvasElement: any;
  context: any;
  showspinner = true;
  myurl: string;
  @ViewChild('video', { static: true }) video;
  videoElement: HTMLVideoElement;
  /* saved in videoElement type HTMLVideoElement  and methods used were srcObject and used in canvas for display  */
  @ViewChild('picture', { static: false }) picture;
  /* Not used anywhere*/
  @ViewChild('canvas', { static: false }) canvas;
  /* saved in canvasElement and methods used were getContext, toDataURL and used received the blob  */
  blur: boolean;
  sepia: boolean;
  invert: boolean;
  flip: boolean;
  constructor(db: AngularFirestore, private storage: AngularFireStorage,
       public dialogRef: MatDialogRef<BottomSheetVideo>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfoLogin) { }

  ngOnInit() {
    this.videoElement = this.video.nativeElement;
    navigator.mediaDevices
       .getUserMedia({
         video: { width: 200, height: 200, facingMode: 'user', aspectRatio: .5 }
       })
       .then(stream => {
         this.videoElement.srcObject = stream;
       });
  }

  takePicture() {
    
    this.canvasElement = this.canvas.nativeElement;
    this.context = this.canvasElement.getContext('2d');
    this.context.drawImage(this.videoElement, 0, 0, 200, 200);
  }
  dosomething(){
    this.showspinner = false;
  }
  savePicture(){
    this.storage.storage.refFromURL(this.data.customphotoURL).delete();//add retry code
    const dataUrl = this.canvasElement.toDataURL('image/jpeg', 1.0);

    const image = atob(dataUrl.split('data:image/jpeg;base64,')[1]);
    const length = image.length;
    const imageBytes = new ArrayBuffer(length);
    const ua = new Uint8Array(imageBytes);
    for (let i = 0; i < length; i++) {
      ua[i] = image.charCodeAt(i);
    }
    const blob = new Blob([ua], { type: 'image/jpeg' });
    const date = new Date().valueOf();
    let text = '';
    const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
    }
    // Replace extension according to your media type like this 
    const imageName = date + '.' + text + '.jpeg';
    const imageFile = new File([blob], imageName, { type: 'image/jpeg' });
    //this.generatedImage =  window.URL.createObjectURL(imageFile);
     // window.open(this.generatedImage);
    this.storage.upload(`images/${new Date().getTime()}_${text}`, imageFile).then(uploadstat => {
      if (uploadstat != null) {
        uploadstat.ref.getDownloadURL().then(downloadURL => {
          //this.storage.storage.refFromURL(downloadURL));
          this.data.customphotoURL = downloadURL;
          this.dialogRef.close(this.data);
        });
      }
    });
    
  }
  goback(){
    this.data = null;
    this.dialogRef.close(this.data);
  }
}
