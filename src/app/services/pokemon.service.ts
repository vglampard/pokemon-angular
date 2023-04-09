import { Injectable } from '@angular/core';
import { PokemonList } from 'PokemonListType';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PokemonType } from 'PokemonType';

@Injectable({
  providedIn: 'root',
})

// TIDY ALL THIS BIT UP
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=50';

  constructor(private http: HttpClient) {}

  // Get batch of 50 pokemon from specific offset
  getPokemon(offset: number): Observable<PokemonList> {
    return this.http.get<PokemonList>(`${this.apiUrl}&offset=${offset}`);
  }

  getSpecificPokemon(name: string): Observable<PokemonType> {
    return this.http.get<PokemonType>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
  }



  
}
