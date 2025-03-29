import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export const NoAuthGuard: CanActivateFn | CanActivateChildFn = (
  route,
  state
) => {
  const router: Router = inject(Router);

  // Check the authentication status
  return inject(AuthenticationService)
    .check()
    .pipe(
      switchMap((authenticated) => {
        // If the user is authenticated...
        if (authenticated) {
          return of(router.parseUrl('admin/dashboard/home'));
        }

        // Allow the access
        return of(true);
      })
    );
};
