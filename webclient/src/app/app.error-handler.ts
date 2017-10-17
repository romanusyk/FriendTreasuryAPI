import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ErrorHandler, Inject, NgZone, isDevMode, Injector, Injectable } from '@angular/core';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  // private ngZone: NgZone;
  // private toastyService: ToastsManager;
  constructor(
    private ngZone: NgZone,
    @Inject(ToastsManager) private toastyService: ToastsManager) {
      // this.ngZone = this.injector.get(NgZone);
      // this.toastyService = this.injector.get(ToastsManager);
  }

  handleError(error: any): void {
    this.ngZone.run(() => {
      this.toastyService.error('An unexpected error happened.');
    });

    throw error;
  }
}
