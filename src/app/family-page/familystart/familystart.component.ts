import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-familystart',
  templateUrl: './familystart.component.html',
  styleUrls: ['./familystart.component.css']
})
export class FamilystartComponent implements OnInit {

  constructor(public svc: UserService) { }

  ngOnInit() {
  }

  fatherforward(){

  }
  motherforward(){
    
  }
}
