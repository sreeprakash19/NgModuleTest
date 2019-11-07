import { Component } from '@angular/core';
import { Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import { UserService } from './user.service';
import { routerTransition } from './route.animation';

export interface Pokemon {
  value: string;
  viewValue: string;
}

export interface PokemonGroup {
  disabled?: boolean;
  name: string;
  pokemon: Pokemon[];
}


@Component({
  selector: 'app-root',
  animations: [ routerTransition ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test';
  pokemonControl = new FormControl('');
  pokemonGroups: PokemonGroup[] = [
    {
      name: 'Route Animation',
      pokemon: [
        {value: 'lazy/1', viewValue: 'Lazy Page /1'}
      ]
    },    
    {
      name: 'MainPage',
      pokemon: [
        {value: 'main-page', viewValue: 'Main Page Tests'}
      ]
    },    
    {
      name: 'AutoComplete',
      pokemon: [
        {value: 'feature-autocomplete', viewValue: 'AutoComplete Feature'}
      ]
    },
    {
      name: 'FormControl Array',
      pokemon: [
        {value: 'fcarray-start', viewValue: 'FC Start'}
      ]
    },    
    {
      name: 'Work on Module',
      pokemon: [
        {value: 'feature-start', viewValue: 'FeatureStart'},
        {value: 'feature-final', viewValue: 'FeatureFinal'}
      ]
    },
    {
      name: 'Angular Environment',
      pokemon: [
        {value: 'envstart-menu', viewValue: 'Setup Env'}
      ]
    },
    {
      name: 'Angular Dev start',
      pokemon: [
        {value: 'install-login', viewValue: 'Login Screen'}
      ]
    },
    {
      name: 'FlexMaterialArrayFirestore',
      pokemon: [
        {value: 'fmafstart', viewValue: 'Json View'}
      ]
    },
    {
      name: 'Consent App',
      pokemon: [
        {value: 'angular-install', viewValue: 'Material'}
      ]
    },
    {
      name: 'My-member.com',
      pokemon: [
        {value: 'angular-install', viewValue: 'Material'}
      ]
    },
    {
      name: 'Team-Management.Class',
      pokemon: [
        {value: 'team-mgt-start', viewValue: 'Team Management start'}
      ]
    }

  ];
  pokemonControltc = new FormControl({value: '', disabled: true});
  pokemonGroupstc: PokemonGroup[] = [
    {
      name: 'Route Animation',
      pokemon: [
        {value: 'lazy/1', viewValue: 'Go to Lazy Page /1'}
      ]
    },   
    {
      name: 'MainPage',
      pokemon: [
        {value: 'main-page', viewValue: 'FG Values'},
        {value: 'ref-aray', viewValue: 'Family References'},
        {value: 'ref-friends', viewValue: 'Friends References'},
        {value: 'claim-array', viewValue: 'Gift Claims'},
        {value: 'fn-array', viewValue: 'Function Invites'},
        {value: 'link-req', viewValue: 'Link Requests'},
        {value: 'claim-settings', viewValue: 'Family Claims'},
        {value: 'search-settings', viewValue: 'Family Search'},
        {value: 'sc-write', viewValue: 'SubCollection- write'},
        {value: 'sc-read', viewValue: 'SubCollection-SingleQuery'},
        {value: 'sc-writearray', viewValue: 'SubCollection-arrayAdd'},
        {value: 'sc-queryarray', viewValue: 'SubCollection-queryAdd'}
      ]
    }, 
    {
      name: 'autocomplete TC',
      pokemon: [
        {value: 'feature-autocomplete', viewValue: 'Initial autocomplete'},
        {value: 'autocomplete-localArray', viewValue: 'Save in LocalArray'}
      ]
    },
    {
      name: 'FormControl Array',
      pokemon: [
        {value: 'fcarray-start', viewValue: 'Initial FormControl'},
        {value: 'fcarray-FormField', viewValue: 'FormField Basics'},
        {value: 'fcarray-inputhint', viewValue: 'inputhint Basics'},
        {value: 'fcarray-materror', viewValue: 'Mat Error'},
        {value: 'fcarray-errstatematch', viewValue: 'Error State Match'},
        {value: 'fcarray-syncValidator', viewValue: 'Sync Validator'},
        {value: 'fcarray-AsyncValidator', viewValue: 'Async Validator'},
        {value: 'fcarray-localarray', viewValue: 'FormControl Methods'},
        {value: 'fcarray-firestoreArray', viewValue: 'Array- FormControl '},
        {value: 'fcarray-firestoreControl', viewValue: 'Array- FormGroup '},
        {value: 'fcarray-select', viewValue: 'Mat-select Array '}             
      ]
    },   
    {
      name: 'Work on Module',
      pokemon: [
        {value: 'feature-start', viewValue: 'Form Group - Array'}
      ]
    },
    {
      name: 'Angular Dev start',
      pokemon: [
        {value: 'install-login', viewValue: 'LoginPass'},
        {value: 'login-olduser', viewValue: 'LoginOldUser'},
        {value: 'login-fail', viewValue: 'LoginFail'},
        {value: 'login-retry', viewValue: 'LoginRetryPass'},
        {value: 'login-photourl', viewValue: 'LoginPhotoURLSaved'},
        {value: 'login-photourldialog', viewValue: 'PhotoURLDialog'}
      ]
    },
    {
      name: 'Angular Environment',
      pokemon: [
        {value: 'envstart-menu', viewValue: 'MenuBarOptions'},
        {value: 'envstart-calc', viewValue: 'MenuBarCalc'}         ]
    },
    {
      name: 'FlexMaterialArrayFirestore',
      pokemon: [
        {value: 'fmafstart', viewValue: 'FormControl-Class'},
        {value: 'fmafcontrols', viewValue: 'FormGroup -Class'},
        {value: 'fmafgroups', viewValue: 'ArrayGroups'},
        {value: 'fmafvalidation', viewValue: 'ArrayValidation'},
        {value: 'fmafvalues', viewValue: 'ArrayValues'},
        {value: 'fmafblurfocus', viewValue: 'ArrayblurFocus'},
        {value: 'fmafreset', viewValue: 'Arrayreset'}  
      ]
    },
    {
      name: 'Team-Management.Class',
      pokemon: [
        {value: 'team-mgt-start', viewValue: 'FormArray'},
        {value: 'team-mgt-fc', viewValue: 'FC Patch'},
        {value: 'team-mgt-fg', viewValue: 'FG Patch'},
        {value: 'team-mgt-fa', viewValue: 'FA Patch'},
        {value: 'team-mgt-group', viewValue: 'FormGroup'},
        {value: 'team-mgt-control', viewValue: 'FormControl'},
        {value: 'team-mgt-firebase', viewValue: 'DataFromFB'},
        {value: 'team-mgt-Save', viewValue: 'SavetoFB'},
        {value: 'team-mgt-patch', viewValue: 'PatchData'},
        {value: 'team-mgt-reset', viewValue: 'resetData'},
        {value: 'team-mgt-valid', viewValue: 'Vallidation'},
        {value: 'team-mgt-Blursub', viewValue: 'UpdateBlurSubmit'},
        {value: 'team-mgt-ErrMatch', viewValue: 'ErrorMatcher'},
        {value: 'team-mgt-AsyncValid', viewValue: 'AsyncValid'}
      ]
    }

  ];
  constructor(private router: Router, public svc: UserService){
    this.svc.footerdisplay = `
    Plan: To create an atomic Lazy loaded Feature Module with shared Module and Service Provider.
      This module can be developed in feature-start and completed in feature-final.
      Once developed user can select the module for Manual testing or automated testing.

    steps to create this project:
      Start with angular-cli
      ng new test
      cd .\test\
      ng build
      ng serve
      git remote add origin https://github.com/gmanojisaac/NgModuleTest.git
      git push --set-upstream origin master    
    
    Steps: For Testing Lazy-Feature Module with shared Module
      Plan: Use commands to create a branch from master 
      Use cli to create Feature module-CustomerDashboard using angular-cli
      Use cli to create module-app-material.
      Use cli to create shared module-shared importing common module but exporting common/forms Module`;
  }
  ClickSelect(location: string){
    if(location != null){
      this.router.navigateByUrl(location);
      this.pokemonControltc.reset({ value: this.pokemonControl.value, disabled: false });
    }
   
  }
  clickedNone(){

    this.router.navigate(['\home']);
    
  }
  clickedNonetc(){
    this.router.navigateByUrl(this.pokemonControl.value);
  }
  ClickSelecttc(location: string){
    if(location != null){
      this.svc.hellotext = location;
      this.svc.sendData(location);
      this.router.navigateByUrl(location);
    }
  }
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
