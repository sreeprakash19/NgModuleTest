import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../user.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-firebase-union',
  templateUrl: './firebase-union.component.html',
  styleUrls: ['./firebase-union.component.css']
})

  export class FirebaseUnionComponent implements OnInit {

    form: FormGroup = null;
    name = 'Angular';
    vehicles: any[] = [
      {Model: 'Fiat', RegistrationPlate: 'Taxi', LastServiceDate: 'Nov 11', Vin: '111', YearManufacture: '2015'},
      {Model: 'Fiat1', RegistrationPlate: 'Taxi', LastServiceDate: 'Nov 11', Vin: '111', YearManufacture: '2015'}];
    vehiclesLatest: any[] = [
      {Model: 'Fiat', RegistrationPlate: 'Taxi', LastServiceDate: 'Nov 11', Vin: '111', YearManufacture: '2015'},
      {Model: 'Fiat1', RegistrationPlate: 'Taxi', LastServiceDate: 'Nov 11', Vin: '111', YearManufacture: '2015'},
      {Model: 'Fiat2', RegistrationPlate: 'Taxi', LastServiceDate: 'Nov 11', Vin: '111', YearManufacture: '2019'}];
  
    vehiclesNext: any[] = [{Model: 'GoAway', RegistrationPlate: 'Taxi', LastServiceDate: 'Nov 11', Vin: '111', YearManufacture: '2015'},
    {Model: 'Fiat1', RegistrationPlate: 'Taxi', LastServiceDate: 'Nov 11', Vin: '111', YearManufacture: '2015'}];

    items: Observable<any[]>;
   
    constructor (    private formBuilder: FormBuilder, public svc: UserService, private afs: AngularFirestore
    ) {



/*
      this.afs.collection('UserData').doc('KjMfJfNSJzVuV7X5ds8Xu0KUCvG2').valueChanges((mydata) =>
      {
        console.log('changes', mydata )
        this.vehiclesLatest = mydata;
      });

      this.afs.collection('UserData').where('vehicles', 'array-contains', {Model: 'GoAway', RegistrationPlate: 'Taxi', LastServiceDate: 'Nov 11', Vin: '111', YearManufacture: '2015'});
      
*/
//https://stackblitz.com/edit/angular-form-array-example for push into formArray
//How to work with references- https://stackoverflow.com/questions/53205155/firestore-where-array-contains-query-doesnt-work-with-references

    }
  
    ngOnInit(): void {
      if (this.svc.hellotext === '') {
  
        this.svc.sidebardisplay = `      
        Start
      `;
        this.svc.footerdisplay = `      
      `;
        this.svc.resultdisplay = `
      `;
        this.svc.moredisplay = `      
      `;
      }
      if (this.svc.hellotext === 'autocomplete-localArray') {
  
        this.svc.sidebardisplay = `  
        Component: this.form is a Group and it contains more groups
        this.form = this.formBuilder.group({
          owner: this.formBuilder.group({}),
        });
      `;
        this.svc.footerdisplay = `  
        vehicles: any[] = [{Model: 'Fiat', RegistrationPlate: 'Taxi', LastServiceDate: 'Nov 11', Vin: '111', YearManufacture: '2015'},
        {Model: 'Fiat1', RegistrationPlate: 'Taxi', LastServiceDate: 'Nov 11', Vin: '111', YearManufacture: '2015'}];
        
        Here we have an array of details from a document
      `;
        this.svc.resultdisplay = `
        Inside the ngOninit-> iterate the array
        const vehicleFormGroups: FormGroup[] = this.vehicles.map(v => {
          return this.formBuilder.group({
              model: [
                v.Model,
              ],
              registrationPlate: [
                v.RegistrationPlate,
              ],
              lastServiceData: [
                v.LastServiceDate,
              ],
              vin: [
                v.Vin,
              ],
              yearManufacture: [
                v.YearManufacture,
              ],
            });
          });
  
          And added an group to the array using add control
          const vehiclesFormArray: FormArray = new FormArray(vehicleFormGroups);
  
          (this.form.get('owner') as FormGroup).addControl('vehicles', vehiclesFormArray);
      `;
        this.svc.moredisplay = `      
        similarly: for next FormGroup inside the array
        vehiclesFormArray1
        1. Array query- https://github.com/meumobi/mmb-demos.crud-angularfirestore-ionic4/blob/master/src/app/shared/item.service.ts
        2. Array Filter -https://stackblitz.com/edit/angular-filter-based-on-city-name?file=src/app/app.component.ts
        3. RxJS - https://medium.com/@joaqcid/how-to-inner-join-data-from-multiple-collections-on-angular-firebase-bfd04f6b36b7
        

      `;
      }
      
  
      this.form = this.formBuilder.group({
     });

    const vehicleFormGroups: FormGroup[] = this.vehiclesLatest.map(v => {
      return this.formBuilder.group({
          model: [
            v.Model,
          ],
          registrationPlate: [
            v.RegistrationPlate,
          ],
          lastServiceData: [
            v.LastServiceDate,
          ],
          vin: [
            v.Vin,
          ],
          yearManufacture: [
            v.YearManufacture,
          ],
        });
      });
  
      const vehiclesFormArray: FormArray = new FormArray(vehicleFormGroups);
  
      (this.form as FormGroup).addControl('vehicles', vehiclesFormArray);
    /*
  
      const vehicleFormGroups1: FormGroup[] = this.vehiclesLatest.map(v => {
        return this.formBuilder.group({
            model: [
              v.Model,
            ],
            registrationPlate: [
              v.RegistrationPlate,
            ],
            lastServiceData: [
              v.LastServiceDate,
            ],
            vin: [
              v.Vin,
            ],
            yearManufacture: [
              v.YearManufacture,
            ],
            updated: ''
          });
        });
    
        const vehiclesFormArray1: FormArray = new FormArray(vehicleFormGroups1);
    
        (this.form as FormGroup).addControl('vehicles1', vehiclesFormArray1);
*/
        
        
    }
    saveForm(){
      
      const vehicleFormGroups1: FormGroup[] = this.vehiclesNext.map(v => {
        return this.formBuilder.group({
            model: [
              v.Model,
            ],
            registrationPlate: [
              v.RegistrationPlate,
            ],
            lastServiceData: [
              v.LastServiceDate,
            ],
            vin: [
              v.Vin,
            ],
            yearManufacture: [
              v.YearManufacture,
            ],
            updated: ''
          });
        });
    
        const vehiclesFormArray1: FormArray = new FormArray(vehicleFormGroups1);
        (this.form as FormGroup).removeControl('vehicles1');
        (this.form as FormGroup).removeControl('vehicles');
        (this.form as FormGroup).setControl('vehicles', vehiclesFormArray1);
        let setDoc = this.afs.collection('UserData').doc('KjMfJfNSJzVuV7X5ds8Xu0KUCvG2').set(this.form.value);
        //console.log(this.form.value);
    }

    loadData(){
      let citiesRef =this.afs.collection('UserData');
      let allCities = citiesRef.get().subscribe(snapshot => {
        snapshot.forEach(doc => {
           this.form.patchValue(doc.data());
          //console.log(doc.id, '=>', doc.data());
        });
      });
    }
    actualsave(){
      let setDoc = this.afs.collection('UserData').doc('KjMfJfNSJzVuV7X5ds8Xu0KUCvG2').set(this.form.value);
    }
    QueryData(){
      let citiesRef =this.afs.collection('UserData', ref=> ref.where('vechicles.lastServiceData', '==', 'Nov 11'));
      let allCities = citiesRef.get().subscribe(snapshot => {
        snapshot.forEach(doc => {
           //this.form.patchValue(doc.data());
          console.log(doc.id, '=>', doc.data());
        });
      });
    }
    pushtoarray(){
      const creds = this.form.controls.vehicles as FormArray;
      creds.push(this.formBuilder.group({
        model: '',
        RegistrationPlate: 'Taxi', 
        LastServiceDate: 'Nov 11', 
        Vin: '111', 
        YearManufacture: '2015',
        updated: ''
      }));

      //or push as this.formBuilder.control({})
    }

  }