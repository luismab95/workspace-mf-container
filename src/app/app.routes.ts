import { Routes } from '@angular/router';
import { ContentComponent } from './shared/components/layout/content/content.component';
import { FullComponent } from './shared/components/layout/full/full.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { NoAuthGuard } from './shared/guards/noAuth.guard';
import {
  RemoteConfig,
  Manifest,
  getManifest,
  loadRemoteModule,
} from '@angular-architects/module-federation';

type CustomRemoteConfig = RemoteConfig & {
  name: string;
  remoteEntry: string;
  path: string;
  guards: string[];
  isAuthRoute: boolean;
  exposedModule: string;
  moduleName: string;
  typeRemote: string;
};

type CustomManifest = Manifest<CustomRemoteConfig>;
const manifest = getManifest<CustomManifest>();

const authRoutes = buildRoutesAuth(manifest);
const dashRoutes = buildRoutesDash(manifest);
dashRoutes.push({
  path: 'dashboard',
  data: {
    title: 'Inicio',
    parentBreadcrumb: 'Panel',
    breadcrumb: 'Inicio',
  },
  loadChildren: () => import('src/app/modules/dashboard/dashboard.routes'),
});

function buildRoutesAuth(options: CustomManifest): Routes {
  const routes: CustomManifest = {};
  Object.keys(options).map((key) => {
    const entry = options[key];
    if (entry.isAuthRoute) routes[key] = { ...entry };
  });
  const lazyRoutes: Routes = Object.keys(routes).map((key) => {
    const entry = options[key];
    return {
      path: entry.path,
      loadChildren: () =>
        loadRemoteModule({
          type: 'module',
          remoteEntry: entry.remoteEntry,
          exposedModule: `./${entry.exposedModule}`,
        })
          .then((m) => m[entry.exposedModule])
          .catch(async (err) => {
            console.error(err);
            const m = await import('src/app/modules/error/error.routes');
            return m.default;
          }),
    };
  });
  return lazyRoutes;
}

function buildRoutesDash(options: CustomManifest): Routes {
  const routes: CustomManifest = {};
  Object.keys(options).map((key) => {
    const entry = options[key];
    if (!entry.isAuthRoute) routes[key] = { ...entry };
  });

  const lazyRoutes: Routes = Object.keys(routes).map((key) => {
    const entry = options[key];
    return {
      path: entry.path,
      data: {
        title: entry.name,
        parentBreadcrumb: entry.moduleName,
        breadcrumb: entry.name,
      },
      loadChildren: () =>
        loadRemoteModule({
          type: 'module',
          remoteEntry: entry.remoteEntry,
          exposedModule: `./${entry.exposedModule}`,
        })
          .then((m) => m[entry.exposedModule])
          .catch(async (err) => {
            console.error(err);
            const m = await import('src/app/modules/error/error.routes');
            return m.default;
          }),
    };
  });
  return lazyRoutes;
}

export const routes = [
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: ContentComponent,
    children: dashRoutes,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: FullComponent,
    children: authRoutes,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'error',
    loadChildren: () => import('src/app/modules/error/error.routes'),
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
] as Routes;
