import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../route.animation';

@Component({
  selector: 'app-lazy',
  template: `
  <div [@routerTransition]="getState(o)">
	  <router-outlet #o="outlet"></router-outlet>
  </div>
  `,
  animations: [routerTransition]
})
export class LazyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

}
