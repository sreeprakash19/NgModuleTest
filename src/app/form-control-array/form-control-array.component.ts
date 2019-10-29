import { Component, OnInit } from '@angular/core';
import { UserService, College, CollegeEmp, CollegeDept } from '../user.service';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray,  FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'app-form-control-array',
  templateUrl: './form-control-array.component.html',
  styleUrls: ['./form-control-array.component.css']
})
export class FormControlArrayComponent implements OnInit {
  optionsFormField: FormGroup;
  optionsHint : FormGroup;
  optionsError : FormGroup;
  optionsErrorMatch: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  constructor(public svc: UserService, public formBuilder: FormBuilder, private afs: AngularFirestore) {
    const controlValue = new FormControl('some value'); 
    console.log('controlValue: value', controlValue.value);     // 'some value'

    const controlStatus = new FormControl({ value: null, disabled: true });
    console.log('controlStatus: value', controlStatus.value);   // 'n/a' console.log(control.status);    // 'DISABLED'

    
    
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
        this.svc.moredisplay= `
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
          this.optionsHint = this.formBuilder.group({
          alignhint: 'start',
          matinputvalue: ['', Validators.required]
        });
        `;
        this.svc.resultdisplay = `
        Add directive for Required https://stackblitz.com/edit/angular-material2-issue-qdqb1n?file=app%2Fmat-form-field-required.directive.ts
        
        We can align the hints to the start or end
        `;
        this.svc.moredisplay= `
        Also if there is any error then we can show it in the hint
        `;
      }
      if (this.svc.hellotext === 'fcarray-materror') {
        this.svc.footerdisplay = `
        <mat-hint [align]="optionsError.value.alignhint" *ngIf="controlError.invalid">{{getErrorMessage()}}</mat-hint>
        `;
        this.svc.sidebardisplay = `
        this.optionsError = this.formBuilder.group({
          alignhint: 'start',
          matinputvalue: ['', [ Validators.required, Validators.minLength(3) ]]
        });
        `;
        this.svc.resultdisplay = `
        get controlError() { 
          return this.optionsError.get('matinputvalue'); 
        }
        `;
        this.svc.moredisplay= `
        getErrorMessage() {
          return this.optionsError.get('matinputvalue').hasError('required') ? 'You must enter a value' :
          this.optionsError.get('matinputvalue').hasError('minlength') ? 'Please Enter 3 characters' :  '';
        }
        `;
      }
      if (this.svc.hellotext === 'fcarray-errstatematch') {
        this.svc.footerdisplay = `
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
        <input matInput placeholder="Simple Placeholder" formControlName="matinputvalueconfirm" [errorStateMatcher]="errorMatcher">
        <mat-hint align="end">{{optionsErrorMatch.value.matinputvalueconfirm?.length || 0}}/10</mat-hint>
        
        <mat-error *ngIf="optionsErrorMatch.hasError('passwordsDoNotMatch')">
          Passwords do not match!
        </mat-error>
        `;
        this.svc.resultdisplay = `
        Mat-error is sufficient for the custom validator which depends on other FormControl Value
        this.optionsErrorMatch = this.formBuilder.group({
          alignhint: 'start',
          matinputvalue: ['', [ Validators.required, Validators.minLength(3) ]],
          matinputvalueconfirm: ['', Validators.required ]
        }, { validator: this.passwordValidator});
        `;
        this.svc.moredisplay= `
        passwordValidator(form: FormGroup) {
          const condition = form.get('matinputvalue').value !== form.get('matinputvalueconfirm').value;
          return condition ? { passwordsDoNotMatch: true} : null;
        }

        `;
      }
      
     
    });

  }

  myAsyncValidator() {

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
      matinputvalue: ['', [ Validators.required ]]
    });

    this.optionsHint = this.formBuilder.group({
      alignhint: 'start',
      matinputvalue: ['', [ Validators.required ]]
    });

    this.optionsError = this.formBuilder.group({
      alignhint: 'start',
      matinputvalue: ['', [ Validators.required, Validators.minLength(3) ]]
    });

    this.optionsErrorMatch = this.formBuilder.group({
      alignhint: 'start',
      matinputvalue: ['', [ Validators.required, Validators.minLength(3) ]],
      matinputvalueconfirm: ['', Validators.required ]
    }, { validator: this.passwordValidator});

  }

  get controlError() { 
    return this.optionsError.get('matinputvalue'); 
  }
  get controlErrorMatch() { 
    return this.optionsErrorMatch.get('matinputvalue'); 
  }
  getErrorMessage() {
    return this.optionsError.get('matinputvalue').hasError('required') ? 'You must enter a value' :
    this.optionsError.get('matinputvalue').hasError('minlength') ? 'Please Enter 3 characters' :'' ;
  }
  getErrorMatchMessage() {
    return this.optionsErrorMatch.get('matinputvalue').hasError('required') ? 'You must enter a value' :
    this.optionsErrorMatch.get('matinputvalue').hasError('minlength') ? 'Please Enter 3 characters' :'' ;
  }
  passwordValidator(form: FormGroup) {
    const condition = form.get('matinputvalue').value !== form.get('matinputvalueconfirm').value;
    return condition ? { passwordsDoNotMatch: true} : null;
  }
}


class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}