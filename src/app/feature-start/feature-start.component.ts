import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { UserService, Team, Employee, Department } from '../user.service';

//Feature-start
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
//Feature End

@Component({
  selector: 'app-feature-start',
  templateUrl: './feature-start.component.html',
  styleUrls: ['./feature-start.component.css']
})
export class FeatureStartComponent implements OnInit {
  // Feature start
  private itemsCollection: AngularFirestoreCollection<Employee>;
  items: Observable<Employee[]>;
  teamForm = this.formBuilder.group({
    employees: this.formBuilder.array([])
  });
  currentData: Employee[]; //active model
  //Feature End
  hellocount = 0;
  constructor(public svc: UserService, public formBuilder: FormBuilder, private afs: AngularFirestore) {
 
    this.svc.footerdisplay = '';
    this.svc.myData.subscribe(
      (val) => this.hellocount = val
    );
    //Feature Start
    this.itemsCollection = afs.collection<Employee>('employees');
    this.items = this.itemsCollection.valueChanges();
    this.loadTeamfromFB();
    //Feature End
  }

  increase() {
    this.svc.increaseCounter();
  }

  //Feature Start
  deleteEmployee(idx: number) {
    this.empFormArray.removeAt(idx);
  }
  onFormSubmit(){
    //save to firebaseDB
  }
  SaveTeam(){
    //get the snapshot changes to get id to update field
  }
  empdetailscurrent(){
    // Dirty form after validation we can get it from currentData or teamForm FG raw value
    return this.currentData;
  }
  teamFormshowvalue(){
    return this.teamForm.getRawValue();
  }
  get empFormArray(): FormArray {
    return this.teamForm.get('employees') as FormArray;
  }
  loadsetcontrol(){
    this.itemsCollection.valueChanges().subscribe((dbemployee) => {
      if (dbemployee != null) {
        const employeeFormGroups = dbemployee.map(employee => this.formBuilder.group(employee));
        const employeeFormArray = this.formBuilder.array(employeeFormGroups);
        this.teamForm.setControl('employees', employeeFormArray);
        this.teamForm.get('employees').patchValue(dbemployee);
       }// after pushing a formGroup into the array we are patching pristine value from db
        
    });
  }
  loadTeamfromFB() {
    
    this.itemsCollection.valueChanges().subscribe((dbemployee) => {
      if (dbemployee != null) {


        for (let employee = 0; employee < dbemployee.length; employee++) {
          this.addEmployee();

        }// after pushing a formGroup into the array we are patching pristine value from db
        this.teamForm.get('employees').patchValue(dbemployee);
      }
    });

  }
  addEmployee() {
    const fg = this.formBuilder.group(new Employee(
      '',
      '',
      'myshill'
    ));
    this.empFormArray.push(fg);
}

  //Feature End

  ngOnInit() {
    this.currentData = Object.create(null);
    this.teamForm.valueChanges.subscribe(data => {
      this.currentData = data;
    });
  }

}
