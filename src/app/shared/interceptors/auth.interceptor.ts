import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

export const AuthInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const _storageService = inject(StorageService);
  const token = _storageService.getLocalStorage('ACCESS_TOKEN');
  if (token !== undefined && req.headers.get('Authorization') === null) {
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(modifiedReq);
  }
  return next(req);
};
