import { Component, OnInit, Input } from '@angular/core';
import { PokemonType } from '../../types/PokemonType';
import { PokemonService } from 'src/app/services/pokemon.service';

// Result card component, one rendered for each pokemon being shown in ResultsDisplay
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  @Input() pokemon: PokemonType;
  types: any;
  displayImage: string;

  constructor(private pokemonService: PokemonService) {}

  // Order the data from the API so it's easier to render in the template: get an array of types, get the colours associated with that type, and get the best possible image
  ngOnInit(): void {
    // Create an array of objects each represnting a type associated with this pokemon, with each object containing the type name and the colour code to display with it
    this.types = this.pokemon.types.map((type) => {
      return {
        name: type.type.name,
        colour: this.pokemonService.getTypeColour(type.type.name),
      };
    });
    // Set front_default as display image; otherwise if there is one image elsewhere in the set (the sets are sometimes sparsely and unpredictably populated), find it and set display image to that; otherwise, set as 'no image found' icon
    this.displayImage =
      this.pokemon.sprites.front_default !== null
        ? this.pokemon.sprites.front_default
        : Object.entries(this.pokemon.sprites).filter(
            (sprite) => typeof sprite[1] === 'string'
          ).length > 0
        ? Object.entries(this.pokemon.sprites).filter(
            (sprite) => typeof sprite[1] === 'string'
          )[0][1]
        : '../../assets/no-image.png';
  }
}
