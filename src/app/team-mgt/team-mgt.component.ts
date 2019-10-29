import { Component, OnInit } from '@angular/core';
import { UserService, Team, Employee, Department } from '../user.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-team-mgt',
  templateUrl: './team-mgt.component.html',
  styleUrls: ['./team-mgt.component.css']
})
export class TeamMgtComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Employee>;
  items: Observable<Employee[]>;
  allSkills: Observable<any[]>;
  formitems;
  teamForm = this.formBuilder.group({
    employees: this.formBuilder.array([])
  });
  teamGroupForm = this.formBuilder.group({
    teamDept: this.formBuilder.group(new Department(
      'Manoj',
      'Business'
    )),
  });
  teamControlForm = this.formBuilder.group({
    teamName: this.formBuilder.control('Raju'),
    teamMgr: this.formBuilder.control('Ramu'),
  });
//===================================================
//FormArray -> 1. inside Formgroup 
teamControlFg = this.formBuilder.group({
  teamName: this.formBuilder.control('Raju'),
  teamMgr: this.formBuilder.control('Ramu'),
});

teamGroupFg = this.formBuilder.group({
  teamDept: this.formBuilder.group(new Department(
    'Manoj',
    'Business'
  )),
});
teamArrayFg = this.formBuilder.group({
  employees: this.formBuilder.array([])
});
//=================================================
//FormArray -> 2. To add another FormArray, add it inside a FormGroup for requiring an id
//Refer - https://stackblitz.com/edit/angular-patch-value-deeply-nested-component-utk3qv
//current value of the form and saved value of the form
currentData: any; //active model
storedData: any;  //save to disk model 
teamArrayFa = this.formBuilder.group({
  lines: this.formBuilder.array([])
});

constructor(public svc: UserService, public formBuilder: FormBuilder, private afs: AngularFirestore) {
  this.itemsCollection = afs.collection<Employee>('employees');
  this.items = this.itemsCollection.valueChanges();
  this.allSkills = this.svc.getSkills();
  
  //this.addEmployee();
 }
 get employee(): FormGroup{
  return this.formBuilder.group({
        empId : '',
        empName : '',
        skill : ''
            });
}


  loadTeam() {
    this.itemsCollection.valueChanges().subscribe((dbemployee) => {
      if (dbemployee != null) {

        for (let employee= 0; employee < dbemployee.length; employee++) {
          //const playersFormsArray = this.teamForm.at(0) as FormArray;
          this.addEmployee();
          this.addEmployeeFg();
          
        }
        this.teamForm.get('employees').patchValue(dbemployee);
        this.empFormArrayFg.patchValue(dbemployee);
        
      }


    }); 
  //const employeeFormArray = this.formBuilder.array(employeeFormGroups);
  //this.teamForm.setControl('employees', employeeFormGroups);
 }
 teamFormshowvalue(){
  return this.teamForm.getRawValue();
 }
 teamFormshowvalueFg(){
  return this.teamArrayFg.getRawValue();
 }
get empFormArray(): FormArray {
  return this.teamForm.get('employees') as FormArray;
}
get empFormArrayFg(): FormArray {
  return this.teamArrayFg.get('employees') as FormArray;
}
//get empFormArrayFa(): FormArray {
  //return this.teamArrayFa as FormArray;
//}
addEmployee() {
    const fg = this.formBuilder.group(new Employee(
      '',
      '',
      'myshill'
    ));
    this.empFormArray.push(fg);
}
addEmployeeFg() {
  const fg = this.formBuilder.group(new Employee(
    '',
    '',
    'myshill'
  ));
  this.empFormArrayFg.push(fg);
}
deleteEmployeeFg(idx: number) {
  this.empFormArrayFg.removeAt(idx);
}
deleteEmployee(idx: number) {
  this.empFormArray.removeAt(idx);
}

ngOnInit() {
  this.svc.footerdisplay = `
1. Create a new Employee object from the class constructor
2. Create a new FormGroup - fg
3. Create a new FormArray getter function - empFormArray referring to the teamForm employees array
  AllSkills list is initialized from the service as an Observable
4. To add employee push created formGroup
5. To remove the employee using key use removeAt
  `;
  this.svc.sidebardisplay = `
  ${this.teamForm.get('employees').value}`;
  this.svc.resultdisplay = `
  Form Status
  ${this.teamForm.valid}
  `;
  this.svc.moredisplay = `
  ${this.teamForm.controls}
  `;
  //Form-Array with array
  this.currentData = Object.create(null);
  // subscribe to value changes on form
  this.teamArrayFa.valueChanges.subscribe(data => {
    this.currentData = data;
  });
}

Showcurrentvalue(){
  return this.currentData;
}

ShowSavedValue(){
  return this.storedData;
}
saveForm(){
  //save form values to ojbect and reset the form
  this.storedData = this.teamArrayFa.getRawValue();
  this.teamArrayFa.reset();
}
loadFormAction(){
  this.loadForm(this.storedData);
}
 seedForm():void{
  //seed the form with sample data
  this.itemsCollection.valueChanges().subscribe((dbemployee) => {
    if (dbemployee != null) {
      this.loadForm(dbemployee);
    }
  });
  
}

loadForm(data){
  //create lines array first
    for (let line = 0; line < data.employee.length; line++){
      const linesFormArray = this.teamArrayFa.get('lines') as FormArray;
      linesFormArray.push(this.line);
      
      for (let player=0; player < data.lines[line].players.length; player++){
        const playersFormsArray = linesFormArray.at(line).get('players') as FormArray;
        playersFormsArray.push(this.player);
      }
    }
    //once we setup the form with all the arrays and such, we cna just
    //patch the form:
    this.teamArrayFa.patchValue(data);
  }

 

  get player(): FormGroup{
    return this.formBuilder.group({
                first_name: '',
                last_name: ''
              });
  }
  //get functions cannot have parameters...
  get line(): FormGroup{
    return this.formBuilder.group({
          players: this.formBuilder.array([
            ]),
          })
  }


SaveDept(){

}
onFormSubmit_group(){

}
LoadDept(){

}
LoadControl(){

}
onFormSubmit_control(){

}

}
