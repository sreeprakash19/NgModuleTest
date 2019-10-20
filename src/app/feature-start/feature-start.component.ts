import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-feature-start',
  templateUrl: './feature-start.component.html',
  styleUrls: ['./feature-start.component.css']
})
export class FeatureStartComponent implements OnInit {
  
  hellocount = 0;
  constructor(private svc: UserService) {
    this.svc.footerdisplay = '';
    this.svc.myData.subscribe(
      (val) => this.hellocount = val
    );
   }
  increase() {
    this.svc.increaseCounter();
  }

  ngOnInit() {
  }

}
