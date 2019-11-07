import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators,  FormControl, FormArray} from '@angular/forms';

export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {
  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;

  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    }
  ];

  //TC2
  cvForm: FormGroup;
  dataModel: any; //active model
  storeData: any;  //save to disk model

  constructor( public svc: UserService, public formBuilder: FormBuilder) {
    if (this.svc.hellotext === '') {

      this.svc.sidebardisplay = `      
    
    `;
      this.svc.footerdisplay = `      
    `;
      this.svc.resultdisplay = `
    `;
      this.svc.moredisplay = `      
    `;
    }
    if (this.svc.hellotext === 'feature-autocomplete') {

      this.svc.sidebardisplay = `      
    `;
      this.svc.footerdisplay = `      
    `;
      this.svc.resultdisplay = `
    `;
      this.svc.moredisplay = `      
    `;
    }
    //1. Initialize
    this.filteredStates = this.stateCtrl.valueChanges
    .pipe(
      startWith(''),
      map(state => state ? this._filterStates(state) : this.states.slice())
    );
   }

   ngOnInit() {
    //TC2
    this.dataModel = Object.create(null);
    
    this.cvForm = this.formBuilder.group({
      team_name: ['', [Validators.required]],
      lines: this.formBuilder.array([
        ])      
    });

    //subscribe to value changes on form
     this.cvForm.valueChanges.subscribe(data=>{
      this.dataModel = data;
     });
     this.storeData = this.cvForm.getRawValue();
  }

  //1. initialize
  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  //TC2
  showSavedValue(){
    return this.dataModel;
  }
  showValue(){
    return this.cvForm.getRawValue();
  }
  showstoreValue(){
    return this.storeData;
  }

  saveForm(){
    //save form values to ojbect and reset the form
    this.storeData = this.cvForm.getRawValue();
    this.cvForm.reset();
    // reset will not remove form elements added already
    //to the formarrays so we need to purge those as well
    //without losing our subscription! 
     //(this.cvForm.get("lines") as FormArray)['controls'].splice(0);
  this.resetarray(this.storeData);
   
   
  }

  resetarray(data){
  //create lines array first
    for (let line = 0; line < data.lines.length; line++){
     

      const linesFormArray = this.cvForm.get("lines") as FormArray;
      
      
      for (let player=0; player < data.lines[line].players.length; player++){
        const playersFormsArray = linesFormArray.at(line).get("players") as FormArray;
        playersFormsArray.removeAt(line);
      }
      linesFormArray.removeAt(0);

    }
  }
  changeValueInSaveData(){
    // in angular 7 there is no 2 way binding, i have
    // to actually force the change on the control itse;f
    // FAILS TO UPDATE UI :
    // this.saveData.team_name = "changed";
    //this will update the UI and because i'm subscribed
    //to form.valuechanges, it will update the model as well
    this.cvForm.get('team_name').setValue("changed");
  }

  loadFormAction(){
    console.log('Load',this.storeData );
    this.loadForm(this.storeData);
  }

  loadForm(data){
  //create lines array first
  const linesFormArraycheck = this.cvForm.get("lines") as FormArray;
    for (let line = 0; line < data.lines.length; line++){
      //(this.cvForm.get("lines") as FormArray).at(line).get("players").value.length
      console.log('data',data.lines.length, 'cvForm', this.cvForm.get("lines").value.length );
      if(data.lines.length > this.cvForm.get("lines").value.length){
      const linesFormArray = this.cvForm.get("lines") as FormArray;
      linesFormArray.push(this.line);
      
      if(data.lines[line].players.length > linesFormArray.at(line).get("players").value.length){
        for (let player=0; player < data.lines[line].players.length; player++){
          const playersFormsArray = linesFormArray.at(line).get("players") as FormArray;
          playersFormsArray.push(this.player);
        }
      }

      }

    }
    //once we setup the form with all the arrays and such, we cna just
    //patch the form:
    console.log('CvForm',this.cvForm.value );
    this.cvForm.patchValue(data);
  }

  seedForm():void{
    //seed the form with sample data
    this.loadForm(seedData);
  }

  get player():FormGroup{
    return this.formBuilder.group({
                first_name: '',
                last_name: ''
              });
  }
  //get functions cannot have parameters...
  get line():FormGroup{
    return this.formBuilder.group({
          name: '',
          players: this.formBuilder.array([
            ]),
          })
  }
}

//TC2
const seedData =  {
  "team_name": "Team",
  "lines": [
    {
      "name": "line a",
      "players": [
        {
          "first_name": "1a",
          "last_name": ""
        }
      ]
    }
  ]
}
