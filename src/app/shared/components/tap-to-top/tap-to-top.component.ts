import { Component, HostListener, inject, signal } from '@angular/core';
import { NgStyle, ViewportScroller } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'mf-container-tap-to-top',
  templateUrl: './tap-to-top.component.html',
  imports: [NgStyle, FontAwesomeModule],
})
export class TapToTopComponent {
  @HostListener('window:scroll', [])
  onWindowScroll() {
    let number =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (number > 10) {
      this.show.set(true);
    } else {
      this.show.set(false);
    }
  }

  faAngleUp = faAngleUp;
  show = signal<boolean>(false);

  private viewScroller = inject(ViewportScroller);

  tapToTop() {
    this.viewScroller.scrollToPosition([0, 0]);
  }
}
