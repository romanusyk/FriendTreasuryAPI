import { Injectable, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr/src/toast-options';

@Injectable()
export class ToastServiceOptions extends  ToastOptions  {
    positionClass = 'toast-bottom-right';
    newestOnTop = true;
}
