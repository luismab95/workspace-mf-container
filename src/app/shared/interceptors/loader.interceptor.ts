import { finalize, Observable } from 'rxjs';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';

let countRequest: number = 0;
const _loaderService = new LoaderService();

export const loaderInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  if (!countRequest) {
    _loaderService.setIsloading(true);
  }
  countRequest++;

  return next(req).pipe(
    finalize(() => {
      countRequest--;
      if (!countRequest) {
        _loaderService.setIsloading(false);
      }
    })
  );
};
