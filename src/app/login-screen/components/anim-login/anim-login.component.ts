import { Component, OnInit, HostBinding, OnDestroy  } from '@angular/core';
import { UserService } from '../../../user.service';
import { Router, RouterOutlet } from '@angular/router';
import { trigger, transition, animate, style, query, group, animateChild, stagger } from '@angular/animations';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface DialogData {
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string; //also UID, Gender, remove email
}
export interface MyUserData {
  profileData: Array<DialogData>;
}

@Component({
  selector: 'app-anim-login',
  templateUrl: './anim-login.component.html',
  animations: [
    trigger('routeAnimation', [
      transition('* => intro', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ], { optional: true }),
        query(':enter', [
          style({left: '-100%'})
         
        ], { optional: true }),
        query(':leave ', animateChild(), { optional: true }),
        group([
          query(':leave', [
            animate('200ms ease-out', style({ left: '100%'}))
          ], { optional: true }),
          query(':enter', [

            animate('3000ms ease-out', style({ left: '0%'}))
          ], { optional: true })
        ]),
        query(':enter', animateChild(), { optional: true }),
      ])
    ])
  ]
})
export class AnimLoginComponent implements OnInit {

  constructor(public svc: UserService, private _router: Router) { }

  ngOnInit() {
  }
  prepRouteAnimation(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  captureStartEvent(event: AnimationEvent) {
    console.log('start', event);
  }

  captureDoneEvent(event: AnimationEvent) {
    console.log('End', event);
  }
}

@Component({

  selector: 'app-lazy',
  template: `
  <div fxLayout="row" fxLayoutAlign="center center" class="logincomp">
    <img fxFlex="35%" src="/assets/man2-first.png"  />
    <mat-card fxFlex="25%"  class="row-height">
        <mat-card-header>
            <mat-card-title>Never Miss your loved ones on their Special Days!</mat-card-title>
            <mat-card-subtitle>
                <div mat-card-avatar  style= "background-image: url('/assets/man.png'); background-size: contain;"></div>
            </mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content fxLayout="column">
            <mat-spinner *ngIf= "showspinner"></mat-spinner>
            <button mat-raised-button color="primary" *ngIf= "shownewUser" > New User</button>
            <button mat-raised-button color="primary" *ngIf= "showoldUser" (click)="navigateaway()" > Returing User</button>
            <button mat-raised-button color="primary" (click)= "clickLogin()" *ngIf= "showretry" > {{retryoption}}</button>
        </mat-card-content>          
    </mat-card>
    <img fxFlex="35%" src="/assets/man1-first.png"  />
</div>
  `,
  styleUrls: ['./anim-login.component.css'],
  host: {
    '[@pageAnimations]': 'someExpression',
    '(@pageAnimations.start)': 'captureStartEvent($event)',
    '(@pageAnimations.done)': 'captureDoneEvent($event)',
  },
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('img', [
          style({opacity: 0, transform: 'translateY(50%)'}),
          stagger('1000ms', [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ], { optional: true })
      ]),
      transition(':leave', [
        query('img', [
          style({opacity: 1, transform: 'none'}),
          stagger('30ms', [
            animate('5000ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 0, transform: 'translateY(50%)' }))
          ])
        ], { optional: true })
      ])
    ]),
  ]
})


export class Lazy2Component implements OnInit, OnDestroy{
  //@HostBinding('@pageAnimations')
  someExpression= true;
  showspinner = false;
  retryoption = '';
  shownewUser = false;
  showoldUser = false;
  showretry = true;
  mynav = 'loginscreen-start/animlogin/2';
  private itemDoc: AngularFirestoreDocument<MyUserData>;
  somedata: Observable<MyUserData>;
  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.retryoption = 'Google Login';
    this.GoogleLogout();
   }

  ngOnInit() {
  }
  captureStartEvent(event: AnimationEvent) {
    console.log('start', event);
  }

  captureDoneEvent(event: AnimationEvent) {
    console.log('End', event);
  }
  clickLogin() {
    this.showspinner = true;
    this.showretry = false;
    this.retryoption = 'Google Login';
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(successLogin => {
      this.findOrCreate(successLogin.user.uid).then(result => {
        if (result != null) {
          if (result === 'created new doc') { //new
            this.showspinner = false;
            this.shownewUser = true;
            this.showoldUser = false;
          } else {//old
            this.showspinner = false;
            this.showoldUser = true;
            this.shownewUser = false;
          }
          if (result === 'error'){
            this.showspinner = false;
            this.shownewUser = false;
            this.showoldUser = false;
            this.showretry = true;
            this.retryoption = 'Retry Login';
          }
        }
      });
    }).catch(error => {
      //this.ref.markForCheck();
      this.showspinner = false;
      this.shownewUser = false;
      this.showoldUser = false;
      this.showretry = true;
      this.retryoption = 'Retry Login';
      //this.ref.detectChanges();
    });
  }

  docExists(uid: string) {
    return this.afs.doc(`testcollection/${uid}`).valueChanges().pipe(first()).toPromise().catch(error => {
      this.showspinner = false;
      this.shownewUser = false;
      this.showoldUser = false;
      this.showretry = true;
      this.retryoption = 'Retry Login';
    });
  }
  async findOrCreate(uid: string) {
    const doc = await this.docExists(uid);
    if (doc) {

      return 'doc exists';
    } else {
      if( this.retryoption === 'Retry Login'){
        return 'error';
      } else{
        return 'created new doc';
      }
      
    }
  }
  

  ngOnDestroy() {
   
  }
  navigateaway(){
    this.router.navigateByUrl(this.mynav);
  }
  GoogleLogout() {
    this.afAuth.auth.signOut();
  }
}

@Component({
  selector: 'app-lazy',
  template: `<h1>Lazy1</h1>`
})
export class Lazy3Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}