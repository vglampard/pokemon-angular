import { Component } from '@angular/core';

// 404 page, displayed if user tries to use pokemon name in URL that does not return data from the API
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

}
