import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-family-traverse',
  templateUrl: './family-traverse.component.html',
  styleUrls: ['./family-traverse.component.css']
})
export class FamilyTraverseComponent implements OnInit {

  constructor(public svc: UserService) { }

  ngOnInit() {
  }

}

//https://stackoverflow.com/questions/51292378/how-do-you-insert-a-reference-value-into-firestore
//Document reference
