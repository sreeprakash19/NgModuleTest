import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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
  selector: 'app-feature-final',
  templateUrl: './feature-final.component.html',
  styleUrls: ['./feature-final.component.css']
})
export class FeatureFinalComponent implements OnInit {
  pokemonControl = new FormControl();
  pokemonGroups: PokemonGroup[] = [
    {
      name: 'Grass',
      pokemon: [
        {value: 'bulbasaur-0', viewValue: 'Bulbasaur'},
        {value: 'oddish-1', viewValue: 'Oddish'},
        {value: 'bellsprout-2', viewValue: 'Bellsprout'}
      ]
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
