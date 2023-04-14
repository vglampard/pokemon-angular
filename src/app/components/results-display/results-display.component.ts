import { Component, OnInit } from '@angular/core';
import { PokemonType } from "../../types/PokemonType";
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';

// Main results display that returns batches of 50 pokemon results, or a single result based on a user search input
@Component({
  selector: 'app-results-display',
  templateUrl: './results-display.component.html',
  styleUrls: ['./results-display.component.scss'],
})
export class ResultsDisplayComponent implements OnInit {
  page: number = 1;
  totalPokemon: number;
  pokemonSet: PokemonType[] = [];
  nextNavState: boolean;
  previousNavState: boolean;
  constructor(
    private pokemonService: PokemonService,
    private _Activatedroute: ActivatedRoute
  ) {}

  // Set page number variable for this component using the URL's query parameter, and use the page number to a) fetch specific batch of 50 pokemon to be displayed, and b) set whether nav arrow buttons should be dis/abled.
  ngOnInit(): void {
    this._Activatedroute.queryParams.subscribe((params) => {
      let pageString: string | null = (this.page = params['page']);
      this.page = Number(pageString);
      this.getPokemon();
      this.setNavStates();
    });
  }

  // Get 50 pokemon using specific offset calculated from the page number, and for each one make an individual API call to get unique details that are pushed to the main display array
  getPokemon() {
    this.pokemonService
      .getPokemon((this.page - 1) * 50)
      .subscribe((pokemon: any) => {
        this.totalPokemon = pokemon.count;
        this.pokemonSet = [];
        this.getPokemonSetDetails(pokemon.results);
      });
  }

  //Uses data (names and URLs) from inital batch call to populate pokemon array with individual data for each pokemon
  getPokemonSetDetails(pokemon: PokemonType[]) {
    pokemon.forEach((result: any) => {
      this.pokemonService
        .getSpecificPokemon(result.name)
        .subscribe((uniqueResponse: any) => {
          this.pokemonSet.push(uniqueResponse);
        });
    });
  }

  // Get specific pokemon result from user search input and push it to main display array. If no pokemon is returned from API, send alert to user
  getSearchedPokemon(searchTerm: string) {
    this.pokemonService.getSpecificPokemon(searchTerm).subscribe(
      (response) => {
        this.pokemonSet = [];
        this.pokemonSet.push(response);
      },
      (error) => {
        if (error.status) {
          window.alert(
            `${searchTerm} ${error.error} in the Poképedia - try checking your spelling?`
          );
        }
      }
    );
  }

  setNavStates() {
    this.previousNavState = this.page > 1;
    this.nextNavState = this.page < 26;
  }
}
