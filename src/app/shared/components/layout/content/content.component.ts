import { Component, HostListener, inject } from '@angular/core';
import { NavmenuService } from '../../../services/navmenu.service';
import { HideNavScrollService } from '../../../services/hide-nav-scroll.service';
import { LayoutService } from '../../../../shared/services/layout.service';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'mf-container-content',
  templateUrl: './content.component.html',
  imports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
    RouterOutlet,
    FooterComponent,
    NgClass,
    NgStyle,
  ],
})
export class ContentComponent {
  public innerWidth!: number;

  public layout = inject(LayoutService);
  public navmenu = inject(NavmenuService);
  public hidenav = inject(HideNavScrollService);

  constructor() {
    if (window.innerWidth < 1185) {
      this.navmenu.closeSidebar = true;
    }

    if (window.innerWidth <= 992) {
      this.layout.config.settings.sidebar_type = 'compact-wrapper';
    } else {
      this.layout.config.settings.sidebar_type =
        this.layout.config.settings.sidebar_type;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 1185) {
      this.navmenu.closeSidebar = true;
    } else {
      this.navmenu.closeSidebar = false;
    }

    if (window.innerWidth <= 992) {
      this.layout.config.settings.sidebar_type = 'compact-wrapper';
    } else {
      this.layout.config.settings.sidebar_type =
        this.layout.config.settings.sidebar_type;
    }
  }
}
