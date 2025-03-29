import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { TokenI } from 'src/app/shared/interfaces/authentication.interface';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { decodeToken } from 'src/app/shared/utils/jwt.utils';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'mf-container-profile',
  imports: [RouterModule, FontAwesomeModule, NgClass],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  show: boolean = false;
  faUser = faUser;
  tokenPayload!: TokenI;
  faAngleDown = faAngleDown;

  private router = inject(Router);
  private _authenticationService = inject(AuthenticationService);
  private _cookieService = inject(CookieService);

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor() {
    this.tokenPayload = decodeToken();
  }

  open() {
    this.show = !this.show;
  }

  logOut() {
    this._authenticationService
      .signOut(this.tokenPayload.sessionId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        complete: () => {
          const allCookies = this._cookieService.getAll();
          for (const cookie in allCookies) {
            if (allCookies.hasOwnProperty(cookie)) {
              this._cookieService.delete(cookie);
            }
          }
          localStorage.clear();
          this.router.navigate(['/authentication/sign-in']);
        },
      });
  }
}
