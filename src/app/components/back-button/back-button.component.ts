import { Component, Input } from '@angular/core';
// Reusable back button, the arrow direction and the route can be customised
@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent {
  @Input() routerPath: any;
  @Input() direction: string;
}
