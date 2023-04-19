import { Component, OnInit } from '@angular/core';
import { PokemonType } from '../../types/PokemonType';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';

// Main component that displays batches of 50 pokemon OR single pokemon returned from specific search, as well as pagination and navigation buttons. 
@Component({
  selector: 'app-results-display',
  templateUrl: './results-display.component.html',
  styleUrls: ['./results-display.component.scss'],
})
export class ResultsDisplayComponent implements OnInit {
  page= 1;
  totalPokemon: number;
  pokemonSet: any = [];
  nextNavState: boolean;
  previousNavState: boolean;
  constructor(
    private pokemonService: PokemonService,
    private _Activatedroute: ActivatedRoute
  ) {}

  // On load, set page number by pulling number from query parameters. Then use this to A) gfetch a batch of pokemon from the API, and B) set nav buttons state to de/activated.
  ngOnInit(): void {
    this._Activatedroute.queryParams.subscribe((params) => {
      this.page = Number(params['page']);
      this.getPokemon();
      this.setNavButtonState();
    });
  }

  // Get 50 pokemon through from specific offset, and for each one make an individual API call to get unique details.
  getPokemon() {
    this.pokemonService
      .getPokemon((this.page - 1) * 50)
      .subscribe((pokemon: any) => {
        this.totalPokemon = pokemon.count;
        this.pokemonSet = [];
        this.getPokemonSetDetails(pokemon.results);
      });
  }

  //Use data afrom the initial batch call to make individual calls for each pokemon, and push the data to the dispay array pokemonSet.
  getPokemonSetDetails(pokemon: PokemonType[]) {
    pokemon.forEach((result: any) => {
      this.pokemonService
        .getSpecificPokemon(result.name)
        .subscribe((uniqueResponse: any) => {
          this.pokemonSet.push(uniqueResponse);
        });
    });
  }

  // Get result from a single specific pokemon search and set it to the only item in display array pokemonSet. If no data is returned from the API, alert the user that there is possibly a typo in their search term
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

  // Use page number to check if either navigation arrow should be disabled, and set them as required
  setNavButtonState() {
    this.previousNavState = this.page > 1;
    this.nextNavState = this.page < 26;
  }
}
