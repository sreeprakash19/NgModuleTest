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
  pokemonControl = new FormControl();
  pokemonGroups: PokemonGroup[] = [
    {
      name: 'Select Module',
      pokemon: [
        {value: 'feature-start', viewValue: 'FeatureStart'},
        {value: 'feature-final', viewValue: 'FeatureFinal'}
      ]
    }
  ];
  constructor(private router: Router, public svc: UserService){
    this.svc.footerdisplay = `Plan: To create an atomic Lazy loaded Feature Module with shared Module and Service Provider.
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
    }
   
  }
  clickedNone(){

    this.router.navigate(['\home']);
  }
}
