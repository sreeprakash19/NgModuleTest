import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {
  AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors,
  FormControl, FormArray, FormGroupDirective, NgForm, ValidatorFn
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { UniqueAlterEgoValidator } from '../uniquetext.service';

@Component({
  selector: 'app-form-control-array',
  templateUrl: './form-control-array.component.html',
  styleUrls: ['./form-control-array.component.css']
})
export class FormControlArrayComponent implements OnInit {

  optionsFormField: FormGroup;
  optionsHint: FormGroup;
  optionsError: FormGroup;
  optionsErrorMatch: FormGroup;
  OptionsSyncValidator: FormGroup;
  OptionsASyncValidator: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();

  userProfile: FormGroup;
  ownerProfile: FormGroup;
  ownerOptProfile: FormGroup;
  modOwnerProfile: FormGroup;

  vehicles: any[] = [
    { Model: 'Fiat', RegistrationPlate: 'Taxi', LastServiceDate: 'Nov 11', Vin: '111', YearManufacture: '2015' },
    { Model: 'Suzuki', RegistrationPlate: 'Taxi', LastServiceDate: 'Nov 11', Vin: '111', YearManufacture: '2015' }
  ];

  vechicleNames: string[] = [
    'Fiat', 'Maruti', 'GM'
  ];

  // select
  demoForm: FormGroup;

  arrayItems: {
    id: number;
    title: string;
  }[];

  constructor( public svc: UserService, public formBuilder: FormBuilder, private afs: AngularFirestore,
    private alterEgoValidator: UniqueAlterEgoValidator) {
    const controlValue = new FormControl('some value');
    //console.log('controlValue: value', controlValue.value);     // 'some value'

    const controlStatus = new FormControl({ value: null, disabled: true });
    //console.log('controlStatus: value', controlStatus.value);   // 'n/a' console.log(control.status);    // 'DISABLED'



    this.svc.myData.subscribe(newData => {
      if (this.svc.hellotext === 'fcarray-start') {
        this.svc.footerdisplay = `
  Constructor  Parameters:
  formState - any -Initializes the control with an initial value, or an object
  validatorOrOpts- ValidatorFn | AbstractControlOptions | ValidatorFn[] 
  asyncValidator- AsyncValidatorFn | AsyncValidatorFn[]

  abstract setValue(value: any, options?: Object): void
  abstract patchValue(value: any, options?: Object): void
  abstract reset(value?: any, options?: Object): void

  registerOnChange(fn: Function): void
  registerOnDisabledChange(fn: (isDisabled: boolean) => void): void
                    `;
        this.svc.sidebardisplay = `
        Tricks - https://netbasal.com/angular-reactive-forms-tips-and-tricks-bb0c85400b58
        Imp items are 
        Sync Validators
        Async Validators
        Error State Matcher - https://obsessiveprogrammer.com/validating-confirmation-fields-in-angular-reactive-forms-with-angular-material/
        `
          ;
        this.svc.resultdisplay = `
VALID: This control has passed all validation checks.
INVALID: This control has failed at least one validation check.
PENDING: This control is in the midst of conducting a validation check.
DISABLED: This control is exempt from validation checks.
`;
        this.svc.moredisplay = `
        FormControl is the basic Control and angular revolves around it
        `;
      }
      if (this.svc.hellotext === 'fcarray-FormField') {
        this.svc.footerdisplay = `
        type MatFormFieldAppearance = 'legacy' | 'standard' | 'fill' | 'outline';
        FloatLabelType ('never', 'always', 'auto')
        hideRequiredMarker: (true, false) - does not work with FormControl Validators
        style = "background-color:cornflowerblue;" needs to override color: 'primary',
        `;
        this.svc.sidebardisplay =
          `
        1. Note - hiderequired needs a Directive if used with the formGroup
        this.optionsFormField = this.formBuilder.group({
          appearance: 'fill',
          color: 'primary',
          floatLabel: 'auto',
          hideRequiredMarker: false,
          hintLabel: 'Hint my label',
          matinputvalue: ['', Validators.required]
        });
        Mat-Form-Field will contain one or more formControlName inputs
        `
          ;
        this.svc.resultdisplay = `
        <form [formGroup]="optionsFormField">
        <mat-form-field  style="width:160px;" 
        [appearance]="optionsFormField.appearance"
        [color]= "optionsFormField.color"
        [floatLabel] = "optionsFormField.value.floatLabel"
        [hideRequiredMarker]="optionsFormField.value.hideRequiredMarker"
        [hintLabel] = "optionsFormField.value.hintLabel">
        `;
        this.svc.moredisplay = `
        <mat-label>Label Value</mat-label>
        <mat-icon matPrefix>error</mat-icon>
        <input matInput placeholder="Simple placeholder" formControlName = "matinputvalue" >
        <mat-icon matSuffix>error_outline</mat-icon>
      </mat-form-field>
        
        `;
      }
      if (this.svc.hellotext === 'fcarray-inputhint') {
        this.svc.footerdisplay = `
        <mat-form-field>
        <mat-label>Input Type number</mat-label>
        <input matInput formControlName="matinputvalue">
        <span matPrefix>$&nbsp;</span>
        <span matSuffix>.00</span>
        <mat-hint align="end">{{optionsHint.value.matinputvalue?.length || 0}}/10</mat-hint>
        <mat-hint [align]="optionsHint.value.alignhint">Please Enter 3 characters</mat-hint>
    </mat-form-field>
        `;
        this.svc.sidebardisplay = `
        1. Mat-hint for aligning and gives a hint to the user
          this.optionsHint = this.formBuilder.group({
          alignhint: 'start',
          matinputvalue: ['', Validators.required]
        });
        `;
        this.svc.resultdisplay = `
        Add directive for Required https://stackblitz.com/edit/angular-material2-issue-qdqb1n?file=app%2Fmat-form-field-required.directive.ts
        
        We can align the hints to the start or end
        `;
        this.svc.moredisplay = `
        Also if there is any error then we can show it in the hint
        `;
      }
      if (this.svc.hellotext === 'fcarray-materror') {
        this.svc.footerdisplay = `
        <mat-hint [align]="optionsError.value.alignhint" *ngIf="controlError.invalid">{{getErrorMessage()}}</mat-hint>
        In the Component->
        this.optionsError = this.formBuilder.group({
          alignhint: 'start',
          matinputvalue: ['', [ Validators.required, Validators.minLength(3) ]]
        });
        `;
        this.svc.sidebardisplay = `
        1. Use mat-error instead of mat-hint
        <mat-form-field>
                
        <input matInput placeholder="Simple Placeholder" formControlName="matinputvalue">
        <mat-hint align="end">{{optionsError.value.matinputvalue?.length || 0}}/10</mat-hint>
        <mat-error  *ngIf="controlError.invalid">{{getErrorMessage()}}</mat-error>
        </mat-form-field>
        `;
        this.svc.resultdisplay = `
        get controlError() { 
          return this.optionsError.get('matinputvalue'); 
        }
        `;
        this.svc.moredisplay = `
        getErrorMessage() {
          return this.optionsError.get('matinputvalue').hasError('required') ? 'You must enter a value' :
          this.optionsError.get('matinputvalue').hasError('minlength') ? 'Please Enter 3 characters' :  '';
        }
        `;
      }
      if (this.svc.hellotext === 'fcarray-errstatematch') {
        this.svc.footerdisplay = `
        Check - https://stackblitz.com/edit/mat-error-parent-validation?file=src%2Fapp%2Fapp.component.ts
        import { ErrorStateMatcher } from '@angular/material';
        Implement:
        class CrossFieldErrorMatcher implements ErrorStateMatcher {
          isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
            return control.dirty && form.invalid;
          }
        }
        In the component:
        optionsErrorMatch: FormGroup;
        errorMatcher = new CrossFieldErrorMatcher();

        In the template:
        <input matInput placeholder="Simple Placeholder" formControlName="matinputvalueconfirm" [errorStateMatcher]="errorMatcher">
        <mat-hint align="end">{{optionsErrorMatch.value.matinputvalueconfirm?.length || 0}}/10</mat-hint>
        
        <mat-error *ngIf="optionsErrorMatch.hasError('passwordsDoNotMatch')">
          Passwords do not match!
        </mat-error>
        `;
        this.svc.sidebardisplay = `
        1. Mat-input has  [errorStateMatcher]="errorMatcher"
        2. In the component -> errorMatcher = new CrossFieldErrorMatcher();
        3. return control.dirty && form.invalid when the single FormControl has error
        4. Also has a Sync Validator for setting the validation Error.

        `;
        this.svc.resultdisplay = `
        Mat-error is sufficient for the custom validator which depends on other FormControl Value
        this.optionsErrorMatch = this.formBuilder.group({
          alignhint: 'start',
          matinputvalue: ['', [ Validators.required, Validators.minLength(3) ]],
          matinputvalueconfirm: ['', Validators.required ]
        }, { validator: this.passwordValidator});
        `;
        this.svc.moredisplay = `
        passwordValidator(form: FormGroup) {
          const condition = form.get('matinputvalue').value !== form.get('matinputvalueconfirm').value;
          return condition ? { passwordsDoNotMatch: true} : null;
        }

        `;
      }
      if (this.svc.hellotext === 'fcarray-syncValidator') {
        this.svc.footerdisplay = `
        Other inbuilt Validators are
        Validators.email,
        Validators.length,
        Validators.max,
        Validators.maxLength,
        Validators.min,
        Validators.minLength,
        Validators.pattern,
        Validators.required,
        Validators.requiredTrue,
        Validators.compose 
        In the component:
        this.OptionsSyncValidator = this.formBuilder.group({
          alignhint: 'start',
          matinputvalue: ['', Validators.compose(
            [ Validators.required, Validators.minLength(3)]
          ) ],
          matinputNextvalue: ['', Validators.compose(
            [ Validators.required, Validators.minLength(3)]
          ) ],
        },   { validators: this.identityRevealedValidator });
        Difference between ErrorStateMatcher -> identityRevealedValidator is a FormGroup Validator and
         sets the error for the whole FormGroup
        
        `;
        this.svc.sidebardisplay = `
        1. Run a Custom Sync Validator for the whole FormGroup
        2. Check if both the fields have the same value if so then make the form status invalid.
        `;
        this.svc.resultdisplay = `
        <form  [formGroup]="OptionsSyncValidator">
        <mat-card style = "background-color:cornflowerblue;"  fxLayout="column">

            <mat-form-field>                
                <input matInput placeholder="Simple Placeholder" formControlName="matinputvalue" >
                <mat-hint [align]="OptionsSyncValidator.value.alignhint" *ngIf="controlSyncValidator.invalid">{{getSyncValidatorMessage()}}</mat-hint>
                <mat-hint align="end">{{OptionsSyncValidator.value.matinputvalue?.length || 0}}/10</mat-hint>
            </mat-form-field>
            <mat-form-field>
            <input matInput placeholder="Simple Placeholder" formControlName="matinputNextvalue" >

            <mat-hint [align]="OptionsSyncValidator.value.alignhint" *ngIf="controlSyncValidatornext.invalid || OptionsSyncValidator.hasError('identityRevealed') ">{{getSyncValidatorMessagenext()}}</mat-hint>
            <mat-hint align="end">{{OptionsSyncValidator.value.matinputNextvalue?.length || 0}}/10</mat-hint>
  
        </mat-form-field>
        </mat-card>
    </form>
    Value of optionsErrorMatch: <pre> {{ OptionsSyncValidator.value | json }} </pre>
    Status of Value of optionsErrorMatch: {{OptionsSyncValidator.status}}
        `;
        this.svc.moredisplay = `
        <mat-hint [align]="OptionsSyncValidator.value.alignhint" *ngIf="controlSyncValidatornext.invalid || OptionsSyncValidator.hasError('identityRevealed') ">{{getSyncValidatorMessagenext()}}</mat-hint>
        This will show the Hint text for both Form Level error and control level error.
        `;
      }
      if (this.svc.hellotext === 'fcarray-AsyncValidator') {

        this.svc.sidebardisplay = `
          1. Aysnc Validator - Runs a Validation based on Timer- 500ms and switchMap the validation when new request arrives
          2. Check if the user input is not Eric other wise make the form invalid
          
        `;
        this.svc.footerdisplay = `
        this.OptionsASyncValidator = this.formBuilder.group({
          alignhint: 'start',
          matinputvalue: ['',  
          {asyncValidators: [this.alterEgoValidator.validate.bind(this.alterEgoValidator)],]
        });

        Create the Async Validator in the service 
        Inside the service:
          import {
            AsyncValidator,
            AbstractControl,
            ValidationErrors
          } from '@angular/forms';
          import { of, timer } from 'rxjs/index';
          
            Add a Service Function: 

    
            @Injectable({ providedIn: 'root' })
          export class UniqueAlterEgoValidator implements AsyncValidator {
            constructor(private svc: UserService) { }
          
            validate(
              ctrl: AbstractControl
            ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
              return timer(500).pipe(
                  switchMap(() => this.svc.isAlterEgoTaken(ctrl.value).pipe(
                      map(isTaken => (isTaken ? { uniqueAlterEgo: true } : null)),
                      catchError(() => null)
                      )
                  ));
            }
          }
            Implement the function - isAlterEgoTaken
            import { delay } from 'rxjs/operators';
            const ALTER_EGOS = ['Eric'];
        `;
        this.svc.resultdisplay = `
        isAlterEgoTaken(alterEgo: string): Observable<boolean> {
          const yestaken = true;
          const nottaken = false;
          const isTaken = ALTER_EGOS.filter(s => s.includes(alterEgo));
          if (isTaken.length === 0) {
            return of(nottaken).pipe(delay(400));
          } else {
            return of(yestaken).pipe(delay(400));
          }
          In the component- 
          import { UniqueAlterEgoValidator } from '../user.service';
          And inject in the constructor
          constructor(private alterEgoValidator: UniqueAlterEgoValidator) { }
          And in the component:
          get controlASyncValidator(){
            return this.OptionsASyncValidator.get('matinputvalue'); 
          }
          getASyncValidatorMessage() {
            return this.OptionsASyncValidator.get('matinputvalue').hasError('required') ? 'You must enter a value' :
            this.OptionsASyncValidator.get('matinputvalue').hasError('uniqueAlterEgo') ? 'Please enter a different text - Eric' :'' ;
          }

        `;
        this.svc.moredisplay = `
        If Eric is entered then Async Validator will have error 'uniqueAlterEgo'
        In the template:
        <form  [formGroup]="OptionsASyncValidator">
        <mat-card style = "background-color:cornflowerblue;"  fxLayout="column">

            <mat-form-field>                
                <input matInput placeholder="Simple Placeholder" formControlName="matinputvalue" >
                <mat-hint align="end">{{OptionsASyncValidator.value.matinputvalue?.length || 0}}/10</mat-hint>
                <mat-error *ngIf="controlASyncValidator.invalid">{{getASyncValidatorMessage()}}</mat-error>
            </mat-form-field>
        </mat-card>
        </form>
        Value of optionsErrorMatch: <pre> {{ OptionsASyncValidator.value | json }} </pre>
        Status of Value of optionsErrorMatch: {{OptionsASyncValidator.status}}
        `;
      }
      if (this.svc.hellotext === 'fcarray-localarray') {

        this.svc.sidebardisplay = `
        this.userProfile = this.formBuilder.group({
          firstName: '',
          lastName: '',
        });
        Create 2 buttons->
        1. Submit
        2. SetprofileValue
        
      `;
        this.svc.footerdisplay = `
      <form [formGroup]="userProfile"  (ngSubmit)="onSubmitProfile()">
        <mat-card style = "background-color:cornflowerblue;">
            <mat-card-content >
                <div>
                        <mat-form-field 
                        appearance= "legacy"
                        floatLabel = "auto"
                        color= "primary"
                        hintLabel = "Enter First Name" 
                        >                
                        <input matInput placeholder="Enter name" formControlName = "firstName" style = "background-color:cornflowerblue;" >
                        </mat-form-field>
                    </div>
                    <div>
                        <mat-form-field 
                        appearance= "legacy"
                        floatLabel = "auto"
                        color= "primary"
                        hintLabel = "Enter Last Name" 
                        >                
                        <input matInput placeholder="Enter last Name" formControlName = "lastName" style = "background-color:cornflowerblue;" >
                        </mat-form-field>   
                    </div>
                    <mat-card-actions>
                            <button mat-raised-button type="submit">Submit</button>
                            <button mat-raised-button type="button" (click)="SetprofileValue()">SetProfile</button>
                            
                    </mat-card-actions>
                    
            </mat-card-content>
        </mat-card>
        
    </form>
      `;
        this.svc.resultdisplay = `
        SetprofileValue(){
          console.log("Value", this.userProfile.value);
          console.log("Raw Value", this.userProfile.getRawValue());
          console.log("Set Value");
          this.userProfile.setValue({firstName: 'Nancy', lastName: 'Drew'});
          console.log("Patch Value");
          this.userProfile.patchValue({lastName: 'DrewPatch'});
          console.log("After patch", this.userProfile.value);
          console.log('Reset will - Resets the FormGroup, marks all descendants are marked pristine and untouched');
          this.userProfile.controls['firstName'].reset({value: 'NancyPatch', disabled: true});
          this.userProfile.controls['firstName'].reset({value: 'NancyEnabled', disabled: false});
          console.log("After Reset", this.userProfile.value);
          console.log('Check firstName Cntrl', this.userProfile.contains('firstName'));
          this.userProfile.removeControl('firstName');
          this.userProfile.addControl('firstName',  new FormControl('Changed'));
          console.log("setControl we cannot initalize the value");
          (this.userProfile as FormGroup).setControl('personDocument', new FormControl(''));
          (this.userProfile as FormGroup).addControl('personDocumentadd', new FormControl('Hi'));
          console.log("Form Value", this.userProfile.value);
          this.optionFirstname.setValidators(Validators.required);
          this.optionFirstname.updateValueAndValidity(); 
        }
      `;
        this.svc.moredisplay = `
        We can do the following operations:
        1. Get the FormGroup Value from the component
        2. getRawValue of the FormGroup including the disabled ones
        3. SetValue of the FormGroup for all the FormControls
        4. Patch Value for the FormControls
        5. Reset the FormGroup with disabled status change
        6. Check if a FormControl is present using - contains()
        7. SetControl without init values
        8. Add and Remove the FormControls
        9.Add Validators / remove / run updatevalueand Validity
      `;
      }
      if (this.svc.hellotext === 'fcarray-firestoreArray') {

        this.svc.sidebardisplay = `
        Add from a Local Array having the vechicles Names.
        Assumption wrong -> Creating a FormControl will create an array for Validators.
        So we cannot create a FormControl[] which inturn will have another array.
        We need to use the proper setValidators/ClearValidators to set the Validator array programatically

        Imp- Note : Use AddControl to load with initialized data else use setControl.
        FormArray can be arrays of FormGroup/FormControl else FormGroup[].
        
        Actually FormGroup is a Array where we can have FormControl or FormArray Members(any numbers 1MB Limit)
        
        This is the case where we should not create a FormControl[] because it Formbuilder.CreateControl creates
        an array not a object.
        Only use FormBuilder.CreateGroup to create perfect Objects for saving or patching from firestore.
      `;
        this.svc.footerdisplay = `
        modOwnerProfile: FormGroup;
        
      `;
        this.svc.resultdisplay = `
        this.modOwnerProfile = this.formBuilder.group({
          //aliases: this.fb.array([]);
        });
          
        const vehicleNameControls: FormControl[] = this.vechicleNames.map(v => {
          return this.formBuilder.control({
            VechicleRenames: [
              v
            ]
          });
        });
        const vehiclesNamesFormArray: FormArray = new FormArray(vehicleNameControls);
        (this.modOwnerProfile as FormGroup).addControl('aliases', vehiclesNamesFormArray);

        In the template:
        Error Message is -> No value accessor for form control with path: 'aliases -> 0'
        <form [formGroup]="modOwnerProfile"  (ngSubmit)="onSubmitmodOwnerProfile()">
                <mat-card style = "background-color:cornflowerblue;">
                    <mat-card-content >
                        <div formArrayName ="aliases">
                            <mat-label>Aliases</mat-label> 
                                <button mat-raised-button (click)="addAlias()">Add Alias</button>
                                <div *ngFor="let myname of modOwnerProfile.get('aliases').controls; let i=index">
                                    
                                        <div [formArrayName] = "i">
                                                {{myname.value | json}}
                                                
                                                <div *ngFor="let mynames of i; let j=index">
                                                        <div [formArrayName] = "mynames">
                                                <input matInput placeholder="Enter LastName" [formControlName] = "j" style = "background-color:cornflowerblue;" >
                                                    </div>
                                                    </div>
                                            </div>
                                </div>
                            </div>
                    </mat-card-content>
                </mat-card>
            </form> 
      `;
        this.svc.moredisplay = `
        FromGroup containing FormArray(of FormControls)
        <pre>{{modOwnerProfile.value | json}}</pre>
        When printing the values
        {
          "aliases": [ <--Lines
            {
              "VechicleRenames": [ <-- We cannot have another array
                "Fiat"
              ]
            },
            {
              "VechicleRenames": [
                "Maruti"
              ]
            },
            {
              "VechicleRenames": [
                "GM"
              ]
            }
          ]
        }
      `;
      }
      if (this.svc.hellotext === 'fcarray-firestoreControl') {

        this.svc.sidebardisplay = `
        <pre>{{ownerProfile.value | json}}</pre>
        Add a FormArray in a FormGroup called ownerDetails
        Incase of ownerOptProfile: FormGroup -> FormArray as one of the member 
        and we can have multiple formArray as the FormGroup member
      `;
        this.svc.footerdisplay = `
        Use this FormGroup->
        this.ownerProfile = this.formBuilder.group({
          owner: this.formBuilder.group({}),
        });
      `;
        this.svc.resultdisplay = `
        Create a FormGroup array object and create a FormArray->
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
      
          const vehiclesFormArray: FormArray = new FormArray(vehicleFormGroups);
      `;
        this.svc.moredisplay = `
        Add the ArrayObject to the FormGroup ->
        (this.ownerProfile.get('owner') as FormGroup).addControl('vehicles', vehiclesFormArray);
        In the template:
        <form [formGroup]="ownerOptProfile"  (ngSubmit)="onSubmitmodOwnerProfile()">
        <mat-card style = "background-color:cornflowerblue;">
            <mat-card-content >
                <div formArrayName ="vehicles">
                    <mat-label>vehicles</mat-label> 
                        <button mat-raised-button (click)="addAlias()">Add vehicles</button>
                        <div *ngFor="let myvehicles of ownerOptProfile.get('vehicles').controls; let i=index" [formGroupName]="i">
                            <mat-form-field>
                                <input matInput placeholder="Enter Model" formControlName = "model" style = "background-color:cornflowerblue;" >
                            </mat-form-field>
                        </div>
                    </div>
            </mat-card-content>
        </mat-card>
    </form> 
      `;
      }
      if (this.svc.hellotext === 'fcarray-select') {

        this.svc.sidebardisplay = `
        FormControl Array is the user data
        FormGroup Array means it is the other user data written to me.
        
        How to load to and fro from local Array and from firestore Array is the key for my progress.
        Also if the user writes the data he will send his uid, photoUrl, Name, email and User Data
        I will display the userData in the textarea for chat or Material controls for other user feedback
      `;
        this.svc.footerdisplay = `
        demoForm: FormGroup;

        arrayItems: {
          id: number;
          title: string;
        }[];
      
        In the ngOnInit -> I will initialize the arrayItems and demoForm
        this.arrayItems = [];
        this.demoForm = this.formBuilder.group({
          demoArray: this.formBuilder.array([])
       });
      `;
        this.svc.resultdisplay = `
        Implemented functions in Componenet->
        //select
        get demoArray() {
          return this.demoForm.get('demoArray') as FormArray;
        }
        addItem() {
          this.arrayItems.push({id: 1,  title: 'hello'});
          this.demoArray.push(this.formBuilder.control(false));
        }
        addItemNext() {
          this.arrayItems.push({id: 2,  title: 'myhello'});
          this.demoArray.push(this.formBuilder.control(false));
        }
        removeItem() {
          this.arrayItems.pop();
          this.demoArray.removeAt(this.demoArray.length - 1);
        }

      `;
        this.svc.moredisplay = `
        In the Template->
        <form [formGroup]="demoForm">
        <mat-card style = "background-color:cornflowerblue;">
                <mat-card-content >
                    <div formArrayName="demoArray" 
                        *ngFor="let arrayItem of arrayItems; let i=index">
                        //input
                        <input [id]="arrayItem.id" type="checkbox"
                            [formControl]="demoArray.controls[i]">
                        <label [for]="arrayItem.id" class="array-item-title">
                            {{arrayItem.title}}</label>
                        
                        //mat-select
                        <mat-form-field>
                                <mat-label>Favorite food</mat-label>
                                <mat-select  [formControl]="demoArray.controls[i]">
                                <mat-option *ngFor="let arrayItem of arrayItems" [value]="arrayItem.title">
                                    {{arrayItem.id}}
                                </mat-option>
                                </mat-select>
                        </mat-form-field>


                         
                    </div>
                </mat-card-content>
                <mat-card-actions>
                    <button mat-raised-button (click)= "addItem()">Add item & demoForm</button>
                    <button mat-raised-button (click)= "addItemNext()">Add Next</button>
                    
                    <button mat-raised-button (click)= "removeItem()">Remove</button>
                </mat-card-actions>
            </mat-card>
                    
    </form>
      `;
      }
    });

  }

  ngOnInit() {
    if (this.svc.hellotext === '') {
      this.svc.footerdisplay = `My Idea:
        1. FormControl is the basic building block for Angular
        2. FormControl value is saved as Array element in Firestore
          It is saved as UID Document for the ProfilePage Collection and it has 1MB Limit for every user.
        3. Load the values from Firestore to FormControl elements in the page
        4. Save the values back to Firestore
        `;
      this.svc.sidebardisplay = `
        FormControl is a part of Reactive Forms and it has set of Properties
        setValue() allows the developer to set the value of the control which seems straight forward and reset() resets the control. 
        patchValue() however enables the developer to patch the value of the control
        updateValueAndValidity() can be used to recalculate the value and validation status.
        `;
      this.svc.resultdisplay = `
        We can add values to a FormControl from User Input
        Reset a FormControl
        Get the Raw Values from a FormControl Group
        Get the Status of the FormGroup
        We can Add Validators - Sync / Async
        Also we can set when the validators will run - on Submit or Blur
    
        `;
      this.svc.moredisplay = `
        There is a pristine property too, which lets us know if the user has yet to change the value of the control
        A control changed by a filthy human will also become dirty
        a touched property, which is if the user has triggered the blur event on it.
        valueChanges that emits events every time the value of the control changes in the UI or programatically.
        StatusChanges observable that emits statusChanges:
        UpdateOn - By default, the control will update its parent form each time the control is changed, 
        but we might prefer it to update on blur, when the user exits the control, or only when the final submit button is pressed.
        `;
    }

    this.optionsFormField = this.formBuilder.group({
      appearance: 'fill',
      color: 'accent',
      floatLabel: 'auto',
      hideRequiredMarker: false,
      hintLabel: 'Hint my label',
      matinputvalue: ['', [Validators.required]]
    });

    this.optionsHint = this.formBuilder.group({
      alignhint: 'start',
      matinputvalue: ['', Validators.compose([Validators.required])]
    });

    this.optionsError = this.formBuilder.group({
      alignhint: 'start',
      matinputvalue: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.optionsErrorMatch = this.formBuilder.group({
      alignhint: 'start',
      matinputvalue: ['', [Validators.required, Validators.minLength(3)]],
      matinputvalueconfirm: ['', Validators.required]
    }, { validator: this.passwordValidator }); // <-- FormGroup validator for error state matcher

    this.OptionsSyncValidator = this.formBuilder.group({
      alignhint: 'start',
      matinputvalue: ['', Validators.compose(
        [Validators.required, Validators.minLength(3)]
      )],
      matinputNextvalue: ['', Validators.compose(
        [Validators.required, Validators.minLength(3)]
      )],
    }, { validators: this.identityRevealedValidator }); // <-- add custom validator at the FormGroup level);

    this.OptionsASyncValidator = this.formBuilder.group({
      alignhint: 'start',
      matinputvalue: ['', Validators.compose([Validators.required]), Validators.composeAsync([
        this.alterEgoValidator.validate.bind(this.alterEgoValidator)])]
    });

    this.userProfile = this.formBuilder.group({
      firstName: '',
      lastName: '',
    });

    this.ownerProfile = this.formBuilder.group({
      owner: this.formBuilder.group({}),
    });

    this.ownerOptProfile = this.formBuilder.group({});

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

    const vehiclesFormArray: FormArray = new FormArray(vehicleFormGroups);
    (this.ownerProfile.get('owner') as FormGroup).addControl('vehicles', vehiclesFormArray);
    (this.ownerOptProfile as FormGroup).addControl('vehicles', vehiclesFormArray);
    //case1.

    this.modOwnerProfile = this.formBuilder.group({
      //aliases: this.fb.array([]);
    });

    const vehicleNameControls: FormControl[] = this.vechicleNames.map(v => {
      return this.formBuilder.control(v, [Validators.required]);
    });
    const vehiclesNamesFormArray: FormArray = new FormArray(vehicleNameControls);
    (this.modOwnerProfile as FormGroup).addControl('aliases', vehiclesNamesFormArray);

    //select
    this.arrayItems = [];
    this.demoForm = this.formBuilder.group({
      demoArray: this.formBuilder.array([])
   });


    //end ngOnInit()
  }

  get controlError() {
    return this.optionsError.get('matinputvalue');
  }
  get controlErrorMatch() {
    return this.optionsErrorMatch.get('matinputvalue');
  }
  get controlSyncValidator() {
    return this.OptionsSyncValidator.get('matinputvalue');
  }
  get controlSyncValidatornext() {
    return this.OptionsSyncValidator.get('matinputNextvalue');
  }
  get controlASyncValidator() {
    return this.OptionsASyncValidator.get('matinputvalue');
  }

  //case1.
  get myaliases() {
    return this.modOwnerProfile.get('aliases') as FormArray;
  }
  get myvechicles() {
    return this.ownerOptProfile.get('vehicles') as FormArray;
  }
  getErrorMessage() {
    return this.optionsError.get('matinputvalue').hasError('required') ? 'You must enter a value' :
      this.optionsError.get('matinputvalue').hasError('minlength') ? 'Please Enter 3 characters' : '';
  }
  getErrorMatchMessage() {
    return this.optionsErrorMatch.get('matinputvalue').hasError('required') ? 'You must enter a value' :
      this.optionsErrorMatch.get('matinputvalue').hasError('minlength') ? 'Please Enter 3 characters' : '';
  }
  getSyncValidatorMessage() {
    return this.OptionsSyncValidator.get('matinputvalue').hasError('required') ? 'You must enter a value' :
      this.OptionsSyncValidator.get('matinputvalue').hasError('minlength') ? 'Please Enter 3 characters' : '';
  }
  getSyncValidatorMessagenext() {
    return this.OptionsSyncValidator.get('matinputNextvalue').hasError('required') ? 'You must enter a value' :
      this.OptionsSyncValidator.get('matinputNextvalue').hasError('minlength') ? 'Please Enter 3 characters' :
        this.OptionsSyncValidator.hasError('identityRevealed') ? 'Identity revealed' : '';
  }
  getASyncValidatorMessage() {
    return this.OptionsASyncValidator.get('matinputvalue').hasError('required') ? 'You must enter a value' :
      this.OptionsASyncValidator.get('matinputvalue').hasError('uniqueAlterEgo') ? 'Please enter a different text - Eric' : '';
  }
  passwordValidator(form: FormGroup) {
    const condition = form.get('matinputvalue').value !== form.get('matinputvalueconfirm').value;
    return condition ? { passwordsDoNotMatch: true } : null;
  }
  identityRevealedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const name = control.get('matinputvalue');
    const alterEgo = control.get('matinputNextvalue');
    if (name !== null && alterEgo !== null) {
      return name && alterEgo && name.value === alterEgo.value ? { identityRevealed: true } : null;
    }


  }

  onSubmitProfile() {

  }
  get optionFirstname() {
    return this.userProfile.get('firstName') as FormControl;
  }

  SetprofileValue() {
    console.log("Value", this.userProfile.value);
    console.log("Raw Value", this.userProfile.getRawValue());
    console.log("Set Value");
    this.userProfile.setValue({ firstName: 'Nancy', lastName: 'Drew' });
    console.log("Patch Value");
    this.userProfile.patchValue({ lastName: 'DrewPatch' });
    console.log("After patch", this.userProfile.value);
    console.log('Reset will - Resets the FormGroup, marks all descendants are marked pristine and untouched');
    this.userProfile.controls['firstName'].reset({ value: 'NancyPatch', disabled: true });
    this.userProfile.controls['firstName'].reset({ value: 'NancyEnabled', disabled: false });
    console.log("After Reset", this.userProfile.value);
    console.log('Check firstName Cntrl', this.userProfile.contains('firstName'));
    this.userProfile.removeControl('firstName');
    this.userProfile.addControl('firstName', new FormControl(''));
    console.log("setControl we cannot initalize the value");
    (this.userProfile as FormGroup).setControl('personDocument', new FormControl(''));
    (this.userProfile as FormGroup).addControl('personDocumentadd', new FormControl('Hi'));
    console.log("Form Value", this.userProfile.value);
    this.optionFirstname.setValidators(Validators.required);
    this.optionFirstname.updateValueAndValidity();
  }

  //case1.
  onSubmitmodOwnerProfile() {

  }
  addAlias() {
    this.myaliases.push(this.formBuilder.control('v'));
  }
  addVechicle() {
    this.myvechicles.push(this.formBuilder.group({
      model: [
        'Mymodel'
      ],
      registrationPlate: [
        ''
      ],
      lastServiceData: [
        ''
      ],
      vin: [
        ''
      ],
      yearManufacture: [
        ''
      ]
    })
    );
  }
  clearAlias() {
    this.myaliases.clear();
  }

  //select
  get demoArray() {
    return this.demoForm.get('demoArray') as FormArray;
  }
  addItem() {
    this.arrayItems.push({id: 1,  title: 'hello'});
    this.demoArray.push(this.formBuilder.control(false));
  }
  addItemNext() {
    this.arrayItems.push({id: 2,  title: 'myhello'});
    this.demoArray.push(this.formBuilder.control(false));
  }
  removeItem() {
    this.arrayItems.pop();
    this.demoArray.removeAt(this.demoArray.length - 1);
  }
}

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}
