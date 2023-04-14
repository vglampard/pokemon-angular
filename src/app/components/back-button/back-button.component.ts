import { Component, Input } from '@angular/core';
// needs better naming
@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent {
  @Input() routerPath: any;
  @Input() direction: string;
  constructor(){}

  ngOnInit():void{
  }

}
