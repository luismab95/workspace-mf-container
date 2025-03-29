import { AfterViewInit, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoaderService } from './shared/services/loader.service';
import { delay, startWith } from 'rxjs';
import Pubsub from 'pubsub-js';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { TapToTopComponent } from './shared/components/tap-to-top/tap-to-top.component';

@Component({
  selector: 'mf-container-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, LoaderComponent, TapToTopComponent],
})
export class AppComponent implements AfterViewInit {
  loading: boolean = false;

  private _loaderService = inject(LoaderService);
  private _router = inject(Router);
  private _toastrService = inject(ToastrService);

  ngAfterViewInit(): void {
    this._loaderService.isLoading
      .pipe(startWith(false), delay(0))
      .subscribe((res) => {
        this.loading = res;
      });
    this.pubSubSucriber();
  }

  pubSubSucriber() {
    Pubsub.subscribe('loading', (_message, data) => {
      this.loading = data;
    });

    Pubsub.subscribe('error', (_message, data) => {
      this.renderErrorMsg(data);
    });

    Pubsub.subscribe('success', (_message, data) => {
      this._toastrService.success(data, 'Aviso');
    });

    Pubsub.subscribe('login-redirect', (_message, data) => {
      if (data) {
        this._router.navigateByUrl('/admin/dashboard/home');
      }
    });
  }

  renderErrorMsg(err: any) {    
    let error: string = '';
    if (err instanceof HttpErrorResponse) {
      error = err.error.message;
    } else {
      error = err.message;
    }
    this._toastrService.error(error, 'Aviso');
  }
}
