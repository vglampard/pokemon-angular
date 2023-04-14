import { Component, Output, EventEmitter } from '@angular/core';

// Search bar and button 
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Output() searchEvent = new EventEmitter<string>();

  // Emits event that triggers search for specific pokemon based on user input value
  runSearch(value: string): void {
    this.searchEvent.emit(value);
  }
}
