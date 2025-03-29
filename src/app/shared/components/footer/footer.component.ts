import { Component } from '@angular/core';

@Component({
  selector: 'mf-container-footer',
  templateUrl: './footer.component.html',
  imports: [],
})
export class FooterComponent {
  year: number = new Date().getFullYear();
}
