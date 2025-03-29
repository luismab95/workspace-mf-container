import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { ResponseI } from '../interfaces/response.interface';
import { decodeToken } from '../utils/jwt.utils';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private urlApi = environment.apiUrl;

  constructor(
    private _httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  check(): Observable<boolean> {
    const accessToken = this.storageService.getLocalStorage('ACCESS_TOKEN');
    if (accessToken && accessToken !== undefined) {
      return of(true);
    }
    return of(false);
  }

  signOut(sessionId: number): Observable<ResponseI<string>> {
    return this._httpClient.delete<ResponseI<string>>(
      `${this.urlApi}/ms-authentication/security/session/${sessionId}`,
      {}
    );
  }
}
