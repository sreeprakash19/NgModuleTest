import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-array-push',
  templateUrl: './array-push.component.html',
  styleUrls: ['./array-push.component.css']
})
export class ArrayPushComponent implements OnInit {

  form: FormGroup = null;
  name = 'Angular';
  vehicles: any[] = [{Model: 'Fiat', RegistrationPlate: 'Taxi', LastServiceDate: 'Nov 11', Vin: '111', YearManufacture: '2015'},
  {Model: 'Fiat1', RegistrationPlate: 'Taxi', LastServiceDate: 'Nov 11', Vin: '111', YearManufacture: '2015'}];
  vehiclesLatest: any[] = [{Model: 'Fiat', RegistrationPlate: 'Taxi', LastServiceDate: 'Nov 11', Vin: '111', YearManufacture: '2015'},
  {Model: 'Fiat1', RegistrationPlate: 'Taxi', LastServiceDate: 'Nov 11', Vin: '111', YearManufacture: '2015'},
  {Model: 'Fiat1', RegistrationPlate: 'Taxi', LastServiceDate: 'Nov 11', Vin: '111', YearManufacture: '2019'}];

  vehiclesNext: any[] = [{Model: 'GoAway', RegistrationPlate: 'Taxi', LastServiceDate: 'Nov 11', Vin: '111', YearManufacture: '2015'},
  {Model: 'Fiat1', RegistrationPlate: 'Taxi', LastServiceDate: 'Nov 11', Vin: '111', YearManufacture: '2015'}];
  constructor (    private formBuilder: FormBuilder, public svc: UserService
  ) {}

  ngOnInit(): void {
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
    `;
    }
    

    this.form = this.formBuilder.group({
    owner: this.formBuilder.group({}),
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

    (this.form.get('owner') as FormGroup).addControl('vehicles', vehiclesFormArray);


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
  
      (this.form.get('owner') as FormGroup).addControl('vehicles1', vehiclesFormArray1);
      
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
      (this.form.get('owner') as FormGroup).removeControl('vehicles1');
      (this.form.get('owner') as FormGroup).removeControl('vehicles');
      (this.form.get('owner') as FormGroup).setControl('vehicles', vehiclesFormArray1);
      console.log(this.form.value);
  }
}
