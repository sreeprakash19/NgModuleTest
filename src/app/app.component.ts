import { Component } from '@angular/core';
import { Router} from '@angular/router';
import {FormControl} from '@angular/forms';

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
  constructor(private router: Router){

  }
  ClickSelect(location: string){
    if(location != null){
      this.router.navigateByUrl(location);
    }
   
  }
}
