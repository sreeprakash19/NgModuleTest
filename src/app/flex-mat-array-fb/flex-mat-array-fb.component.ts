import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { UserService, College, CollegeEmp, CollegeDept } from '../user.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-flex-mat-array-fb',
  templateUrl: './flex-mat-array-fb.component.html',
  styleUrls: ['./flex-mat-array-fb.component.css']
})
export class FlexMatArrayFBComponent implements OnInit {
  // In DB collections or ReactiveForms -groups as the starting points
  // Either we have a FormArray or FormGroup (1 or more formControls) inside the main formGroup
  // FormArray can have FormGroup or FormControl or FormArray inside it.
  // Basic will create a Form for user updating the FormRawData without Validation (pristine to Dirty)
  /*DeptDetails = this.formBuilder.group({
    DeptManager: '',
    DeptDetails: this.formBuilder.group({
      DeptName: '',
      DeptHead: ''
      })
  });

    College = this.formBuilder.group({
    employees: this.formBuilder.array([])
  });*/
  University: FormGroup;
  private universityDept: AngularFirestoreCollection<CollegeDept>;
  private universityEmp: AngularFirestoreCollection<CollegeEmp>;
  private universityDoc: AngularFirestoreDocument<College>;
  Collegeitems: Observable<College>;

  constructor(public svc: UserService, public formBuilder: FormBuilder, private afs: AngularFirestore) { 
    this.universityDoc = afs.doc<College>('UserData/JQJU6AJ5l4LsmorAl4l0');
    // this.universityData = afs.collection<CollegeEmp>('employees');
    this.Collegeitems = this.universityDoc.valueChanges();
  }

  ngOnInit() {
    // To add validators and Error Matcher - FormGroup
    this.createCollegeForm();

    // To add FormGroup in array
    this.addEmployee();

    this.svc.sidebardisplay = `Select the FormControl/Group/Array options`;
    this.svc.footerdisplay = `

    Objective: Know about AbstractControl class and its properties and methods then we will know about FormControl
    1. FormControl in a FormGroup or FormArray
    2. FormGroup in a FormGroup or FormArray
    3. FormArray in a FormGroup or FormArray

    Also how to set the validators- sync/async and control value accessor.
    Also For Async Firebase data check and update custom validation Check - https://www.youtube.com/watch?v=_X5FbiW0L_8
    Also for the firebase submission of form details and validation errors - https://www.youtube.com/watch?v=JeeUY6WaXiA

    Implementation Idea
    1. FormControl has initial values and based on user interation it will show 
    async start and end values same for animations/ Firestore/API
    https://www.youtube.com/watch?v=eHBOQsqTDXw&t=6s for difference between formarray and formgroup
    https://www.youtube.com/watch?v=n3aQl0DCvds&t=14s for adding in form array
    2. Material FormControl initial values need to be referred during build time
    3. Cross mat-form-field validation - https://www.youtube.com/watch?v=m6imvYpP_Js
    4. Domain validators - https://codecraft.tv/courses/angular/advanced-topics/basic-custom-validators/
    5. update value and validity - https://netbasal.com/three-ways-to-dynamically-alter-your-form-validation-in-angular-e5fd15f1e946
    6. Error state Matcher - https://itnext.io/materror-cross-field-validators-in-angular-material-7-97053b2ed0cf
    7. Map and setcontrol in array - https://www.concretepage.com/angular-2/angular-2-4-formbuilder-example
    8. How to save the formgroup to the firestore- https://ajonp.com/courses/angularmaterial/
    angular-material-reactive-forms-update-firestore/
    3. Aux -> PWA/ Hosting/ Cloud Functions/ CDN
    `;
    this.svc.resultdisplay = `
    `;
    this.svc.moredisplay = ``;

  }

  createCollegeForm(){
    this.University = this.formBuilder.group({
      CollegeName: ['', Validators.required],
      PrincipalName: '',
      teamDept: this.formBuilder.group(new CollegeDept('', '')),
      employees: this.formBuilder.array([])
    });
  }

  // add Employee
  get empFormArray(): FormArray {
    return this.University.get('employees') as FormArray;
  }
  addEmployee() {
    let fg = this.formBuilder.group(new CollegeEmp());
    this.empFormArray.push(fg);
  }
  deleteEmployee(idx: number) {
    this.empFormArray.removeAt(idx);
  }
  // Add reset and submit
  addCollegeDetails() {
    return (new College (this.University.get('CollegeName').value, this.University.get('PrincipalName').value));
  }
  onFormSubmit() {
    this.universityDoc.update(JSON.parse( JSON.stringify(this.addCollegeDetails())));
    this.University.reset();

  }
  resetTeamForm() {
    this.University.reset({
      CollegeName: 'Java Team',
      PrincipalName: 'Yogi'
    });
  }
  // 2. 
  teamFormshowvalue(){
    return this.University.getRawValue();
   }
}
