import { Component } from '@angular/core';
import { Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import { UserService } from './user.service';

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
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test';
  pokemonControl = new FormControl('envstart-menu');
  pokemonGroups: PokemonGroup[] = [
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
      name: 'Angular Material json',
      pokemon: [
        {value: 'angular-install', viewValue: 'Material'}
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
    }

  ];
  pokemonControltc = new FormControl({value: '', disabled: true});
  pokemonGroupstc: PokemonGroup[] = [
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
      this.router.navigateByUrl(location);
    }
  }
}
