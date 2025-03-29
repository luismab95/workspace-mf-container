import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'mf-container-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  start = input.required<boolean>();
  loading = input.required<boolean>();
  show = signal<boolean>(true);

  constructor() {
    setTimeout(() => {
      this.show.set(false);
    }, 3000);
  }
}
