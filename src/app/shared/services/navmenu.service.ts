import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons';

export interface Menu {
  headTitle1?: string;
  level?: number;
  path?: string;
  title?: string;
  icon?: any;
  type?: string;
  active?: boolean;
  id?: number;
  bookmark?: boolean;
  children?: Menu[];
  horizontalList?: boolean;
  items?: Menu[];
}

@Injectable({
  providedIn: 'root',
})
export class NavmenuService {
  isDisplay!: boolean;
  language: boolean = false;
  isShow: boolean = false;
  closeSidebar: boolean = false;

  faUser = faUser;
  faHome = faHome;

  constructor() {}

  MENUITEMS: Menu[] = [
    {
      headTitle1: 'General',
    },
    {
      id: 1,
      level: 1,
      title: 'Panel',
      icon: faHome,
      type: 'sub',
      active: true,
      children: [{ path: '/admin/dashboard/home', title: 'Inicio', type: 'link' }],
    },

    {
      headTitle1: 'Administración',
    },
    {
      id: 4,
      level: 1,
      title: 'Usuario',
      icon: faUser,
      type: 'sub',
      active: false,
      horizontalList: true,
      children: [{ path: '/admin/user/profile', title: 'Perfil', type: 'link' }],
    },
  ];

  item = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
