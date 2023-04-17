import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { PokemonType } from '../../types/PokemonType';
import { Router } from '@angular/router';
import { Location, Ability } from '../../types/ResultDetailTypes';

// Component displaying data for specific pokemon
@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.scss'],
})
export class ResultDetailComponent implements OnInit {
  pokemonName: any;
  pokemonData: PokemonType;
  defaultSprites: {
    available: boolean;
    front?: any;
    back?: any;
  };
  location: Location = { name: '', method: '' };
  constructor(
    private pokemonService: PokemonService,
    private _Activatedroute: ActivatedRoute,
    private router: Router
  ) {}

  // Check if default sprite URLs are available, and if so assign them to sprites object. If not, look for two sprites of any type (some have no default sprites, but a couple of others) and assign them for display; if not, register sprites as unavailable.
  getAvailableSprites(sprites: any) {
    if (sprites.front_default && sprites.back_default) {
      this.defaultSprites = {
        available: true,
        front: sprites.front_default,
        back: sprites.back_default,
      };
    } else {
      let allSprites = Object.entries(sprites).filter(
        (sprite) => typeof sprite[1] === 'string'
      );
      if (allSprites.length > 1) {
        this.defaultSprites = {
          available: true,
          front: allSprites[0][1],
          back: allSprites[1][1],
        };
      } else {
        if (allSprites.length === 0) {
          this.defaultSprites = {
            available: false,
          };
        }
      }
    }
  }

  // Get card colour based on the pokemon's first (or only) type.
  getCardColour(pokemon: PokemonType): string {
    return this.pokemonService.getTypeColour(pokemon.types[0].type.name);
  }

  // On init, pull the pokemon's name from the URL parameters and use it to call the pokemon's specific data from the API.
  ngOnInit(): void {
    this.pokemonName = this._Activatedroute.snapshot.paramMap.get('name');
    this.pokemonService.getSpecificPokemon(this.pokemonName).subscribe(
      (pokemon) => {
        this.getAvailableSprites(pokemon.sprites);
        this.pokemonData = pokemon;
        console.log('POKEMON:', pokemon);
        // Use this specific data to make an additional call to the API that returns one location in which the pokemon is encountered.
        this.pokemonService
          .getEncounters(pokemon.location_area_encounters)
          .subscribe((result) => {
            if (result.length > 0) {
              this.location.name = result[0].location_area.name;

              // Use data returned from this call to make another call, this time returning a method by which one might ecounter that pokemon in that location. If no encounters are found, the template uses *ngIf to show placeholder text instead.
              this.pokemonService
                .getEncounterMethod(result[0].location_area.url)
                .subscribe(
                  (result) =>
                    (this.location.method =
                      result.encounter_method_rates[0].encounter_method.name)
                );
            }
          });
        this.getAllAbilityInformation(pokemon.abilities);
      },
      // If someone uses an incorrect pokemon name in the URL, the API call for that 'pokemon' will fail and the user will be redirected to a 404 page, where they can return to the poképedia.
      (_) => {
        this.router.navigate(['/404']);
      }
    );
  }

  // Function I am playing with below
  getAllAbilityInformation(abilitiesArray: Ability[]) {
    let allAbilitiesInfo: any = [];
    abilitiesArray.forEach((ability: Ability) => {
      this.pokemonService
        .getAbilityInformation(ability.ability.url)
        .subscribe((res) => {
          let detail = res.effect_entries.filter(
            (effect: any) => effect.language.name === 'en'
          )
          let ability = {
            name: res.name,
            effect: detail[0].effect,
            summary: detail[0].short_effect,
          };
          allAbilitiesInfo.push(ability);
        });
    });
    console.log('ABILITIES ARRAY AFTER ADDED:', allAbilitiesInfo);
  }
}
