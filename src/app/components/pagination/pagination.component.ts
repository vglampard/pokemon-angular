import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

// Pagination component
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  constructor(private pokemonService: PokemonService) {}
  pagesArray: number[];
  @Input() totalPokemon: number;
  ngOnInit(): void {
    this.getPagesArray();
  }

  // Use total number of pokemon passed down from parent to dynamically create an array of consecutive numbers that serve as the navigation buttons
  getPagesArray(): void {
    this.pokemonService.getPokemon(0).subscribe((response) => {
      const totalPages = response.count / 50;
      const pagesArray = Array.from(
        { length: totalPages + 1 },
        (_, index) => index + 1
      );
      this.pagesArray = pagesArray;
    });
  }
}
