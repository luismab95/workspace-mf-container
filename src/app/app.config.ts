import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { ErrorHandlerInterceptor } from './shared/interceptors/error-handler.interceptor';
import { loaderInterceptor } from './shared/interceptors/loader.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr({
      closeButton: true,
      preventDuplicates: true,
      progressBar: true,
      autoDismiss: true,
      timeOut: 5000,
      titleClass: 'toast-title',
      messageClass: 'toast-message',
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        ErrorHandlerInterceptor,
        loaderInterceptor,
        AuthInterceptor,
      ])
    ),
  ],
};
