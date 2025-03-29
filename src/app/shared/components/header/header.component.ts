import { Component, inject } from '@angular/core';
import { HideNavScrollService } from '../../services/hide-nav-scroll.service';
import { NavmenuService, Menu } from '../../services/navmenu.service';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { ThemeComponent } from './theme/theme.component';
import { ClickOutsideDirective } from '../../directives/outside.directive';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlicePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TokenI } from '../../interfaces/authentication.interface';
import { decodeToken } from '../../utils/jwt.utils';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mf-container-header',
  templateUrl: './header.component.html',
  imports: [
    ProfileComponent,
    SearchComponent,
    ThemeComponent,
    ClickOutsideDirective,
    SlicePipe,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class HeaderComponent {
  menuItems: Menu[] = [];
  item: Menu[] = [];
  searchResult: boolean = false;
  searchResultEmpty: boolean = false;
  text: string = '';
  open = false;
  tokenPayload!: TokenI;
  faBars = faBars;
  apiUrlStatics: string = environment.apiUrlStatics;
  faSearch = faSearch;

  public hidenav = inject(HideNavScrollService);
  public navmenu = inject(NavmenuService);

  constructor() {
    this.navmenu.item.subscribe((menuItems: Menu[]) => (this.item = menuItems));
    this.tokenPayload = decodeToken();
  }

  openMenu() {
    this.navmenu.closeSidebar = !this.navmenu.closeSidebar;
  }

  openSearch() {
    this.open = !this.open;
    this.searchResult = false;
  }

  languageToggle() {
    this.navmenu.language = !this.navmenu.language;
  }

  searchTerm(term: any) {
    term ? this.addFix() : this.removeFix();
    if (!term) return (this.menuItems = []);
    let items: Menu[] = [];
    term = term.toLowerCase();
    this.item.forEach((data) => {
      if (data.title?.toLowerCase().includes(term) && data.type === 'link') {
        items.push(data);
      }
      data.children?.filter((subItems) => {
        if (
          subItems.title?.toLowerCase().includes(term) &&
          subItems.type === 'link'
        ) {
          subItems.icon = data.icon;
          items.push(subItems);
        }
        subItems.children?.filter((suSubItems) => {
          if (suSubItems.title?.toLowerCase().includes(term)) {
            suSubItems.icon = data.icon;
            items.push(suSubItems);
          }
        });
        return;
      });
      this.checkSearchResultEmpty(items);
      this.menuItems = items;
    });
    return;
  }

  checkSearchResultEmpty(items: Menu[]) {
    if (!items.length) this.searchResultEmpty = true;
    else this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    document.body.classList.add('offcanvas');
  }

  removeFix() {
    this.searchResult = false;
    this.text = '';
    document.body.classList.remove('offcanvas');
  }

  clickOutside(): void {
    this.open = false;
    this.searchResult = false;
    this.searchResultEmpty = false;
  }
}
