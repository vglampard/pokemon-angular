import { Component, Output, EventEmitter } from '@angular/core';

// Component allowing users to search for a specific pokemon
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Output() searchEvent = new EventEmitter<string>();

  // Emits event listener to trigger search and result display
  runSearch(value: string): void {
    this.searchEvent.emit(value);
  }
}
