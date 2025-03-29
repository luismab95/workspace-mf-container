import { Component, inject } from '@angular/core';
import { Menu, NavmenuService } from '../../services/navmenu.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faAngleRight,
  faAngleDown,
  faAngleLeft,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mf-container-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [
    NgbModule,
    RouterModule,
    NgStyle,
    FontAwesomeModule,
    NgClass,
    NgTemplateOutlet,
  ],
})
export class SidebarComponent {
  menu: Menu[] = [];
  margin: number = 0;
  width: number = window.innerWidth;
  leftArrowNone: boolean = true;
  rightArrowNone: boolean = false;
  screenWidth!: number;
  screenHeight!: number;
  pined: boolean = false;
  pinedItem: number[] = [];
  apiUrlStatics: string = environment.apiUrlStatics;

  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faAngleRight = faAngleRight;
  faAngleDown = faAngleDown;
  faAngleLeft = faAngleLeft;
  faBars = faBars;

  private router = inject(Router);
  public navServices = inject(NavmenuService);
  public layout = inject(LayoutService);

  menuItems = this.navServices.MENUITEMS;

  constructor() {
    if (window.innerWidth < 1185) {
      this.navServices.closeSidebar = true;
    }
    this.menu = this.navServices.MENUITEMS;

    this.navServices.item.subscribe((menuItems: Menu[]) => {
      this.menuItems = menuItems;
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          menuItems.filter((items) => {
            if (items.path === event.url) {
              this.setNavActive(items);
            }
            if (!items.children) {
              return false;
            }
            items.children.filter((subItems: Menu) => {
              if (subItems.path === event.url) {
                this.setNavActive(subItems);
              }
              if (!subItems.children) {
                return false;
              }
              subItems.children.filter((subSubItems) => {
                if (subSubItems.path === event.url) {
                  this.setNavActive(subSubItems);
                }
              });
              return;
            });
            return;
          });
        }
      });
    });
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  setNavActive(item: Menu) {
    this.menuItems.filter((menuItem) => {
      if (menuItem !== item) {
        menuItem.active = false;
      }
      if (menuItem.children && menuItem.children.includes(item)) {
        menuItem.active = true;
      }
      if (menuItem.children) {
        menuItem.children.filter((submenuItems) => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          } else {
            submenuItems.active = false;
          }
        });
      }
    });
  }

  openMenu() {
    this.navServices.closeSidebar = !this.navServices.closeSidebar;
  }

  // For Horizontal Menu

  scrollToLeft() {
    if (this.margin >= -this.width) {
      this.margin = 0;
      this.leftArrowNone = true;
      this.rightArrowNone = false;
    } else {
      this.margin += this.width;
      this.rightArrowNone = false;
    }
  }

  scrollToRight() {
    if (this.margin <= -3500) {
      this.margin = -3000;
      this.leftArrowNone = false;
      this.rightArrowNone = true;
    } else {
      this.margin += -this.width;
      this.leftArrowNone = false;
    }
  }

  toggleMenu(item: Menu) {
    if (!item.active) {
      this.menuItems.forEach((a: Menu) => {
        if (this.menuItems.includes(item)) {
          a.active = false;
        }
        if (!a.children) {
          return false;
        }
        a.children.forEach((b: Menu) => {
          if (a.children?.includes(item)) {
            b.active = false;
          }
        });
        return;
      });
    }
    item.active = !item.active;
  }

  isPined(itemid: number) {
    return this.pinedItem.includes(itemid);
  }

  togglePined(id: number): void {
    const index = this.pinedItem.indexOf(id);
    if (index !== -1) {
      this.pinedItem.splice(index, 1);
    } else {
      this.pinedItem.push(id);
    }
    if (this.pinedItem.length <= 0) {
      this.pined = false;
    } else {
      this.pined = true;
    }
  }
}
