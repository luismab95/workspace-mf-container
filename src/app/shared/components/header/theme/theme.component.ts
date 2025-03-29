import { Component, inject } from '@angular/core';
import { LayoutService } from '../../../services/layout.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgClass } from '@angular/common';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'mf-container-theme',
  templateUrl: './theme.component.html',
  imports: [FontAwesomeModule, NgClass],
})
export class ThemeComponent {
  faMoon = faMoon;
  faSun = faSun;

  layout = inject(LayoutService);

  dark: boolean =
    this.layout.config.settings.layout_version == 'dark-only' ? true : false;

  constructor() {}

  layoutToggle() {
    this.dark = !this.dark;
    this.dark
      ? document.body.classList.add('dark-only')
      : document.body.classList.remove('dark-only');
    this.layout.config.settings.layout_version = this.dark
      ? 'dark-only'
      : 'light-only';
  }
}
