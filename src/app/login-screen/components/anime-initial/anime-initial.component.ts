import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user.service';
import { Router, RouterOutlet } from '@angular/router';
import { trigger, transition, animate, style, query, group, animateChild } from '@angular/animations';

@Component({
  selector: 'app-anime-initial',
  templateUrl: './anime-initial.component.html',
  styleUrls: ['./anime-initial.component.css'],
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
export class AnimeInitialComponent implements OnInit {

  constructor(public svc: UserService, private _router: Router) { }

  ngOnInit() {
  }

  prepRouteAnimation(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}

@Component({
  selector: 'app-lazy',
  template: `<h1>Lazy1</h1>`
})
export class Lazy1Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}