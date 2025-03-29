import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  PRIMARY_OUTLET,
  RouterLink,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'mf-container-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  imports: [RouterLink, FontAwesomeModule],
})
export class BreadcrumbComponent {
  breadcrumbs:
    | { parentBreadcrumb?: string | null; breadcrumb?: string }
    | undefined;

  title: string = '';

  faHome = faHome;

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter((route) => route.outlet === PRIMARY_OUTLET))
      .subscribe((route) => {
        let title = route.snapshot.data['title'];
        let parent = route.snapshot.data['parentBreadcrumb'];
        let breadcrumb = route.snapshot.data['breadcrumb'];
        this.breadcrumbs = {};
        this.title = title;
        this.breadcrumbs = {
          parentBreadcrumb: parent,
          breadcrumb: breadcrumb,
        };
      });
  }
}
