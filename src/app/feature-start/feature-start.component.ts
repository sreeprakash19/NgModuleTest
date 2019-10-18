import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../user.service';

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
  selector: 'app-feature-start',
  templateUrl: './feature-start.component.html',
  styleUrls: ['./feature-start.component.css']
})
export class FeatureStartComponent implements OnInit {
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
  hellocount = 0;
  constructor(private svc: UserService) {
    this.svc.footerdisplay = '';
    this.svc.myData.subscribe(
      (val) => this.hellocount = val
    );
   }
  increase() {
    this.svc.increaseCounter();
  }

  ngOnInit() {
  }

}
