import { Observable } from 'rxjs/Rx';
import { MdlDialogReference, MdlDialogService } from '@angular-mdl/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Payment, EditPaymentModel } from '../../core/payments/payment.model';
import { DEFAULT_DIALOG_CONFIG } from '../../shared/dialog.config';
import { CUSTOM_MODAL_DATA } from './../../core/injection.token';
import { CreatePaymentModalComponent } from './create-payment-modal/create-payment-modal.component';
import { EditPaymentComponent } from './edit-payment/edit-payment.component';

@Injectable()
export class PaymentModalsService {

  constructor(private dialogService: MdlDialogService) { }

  public showEditPaymentModal(payment: Payment): Observable<boolean> {
    return this.dialogService.showCustomDialog({
      component: EditPaymentComponent,
      providers: [
        {provide: CUSTOM_MODAL_DATA, useValue: Object.assign({}, payment)}
      ],
      ...DEFAULT_DIALOG_CONFIG
    })
    .mergeMap((data: MdlDialogReference) => data.onHide())
    .mergeMap((editedPayment: EditPaymentModel) => {
      if (editedPayment.isEdited) {
        Object.assign(payment, editedPayment);
      }
      return Observable.of(editedPayment.isEdited);
    });
  }

  public showCreatePaymentModal(): Observable<boolean> {
    return this.dialogService.showCustomDialog({
      component: CreatePaymentModalComponent,
      ...DEFAULT_DIALOG_CONFIG
    })
    .mergeMap((data: MdlDialogReference) => data.onHide());
  }

  public showDeletePaymentModal(): Observable<void> {
    return this.dialogService.confirm('Delete payment?', 'No', 'Delete');
  }
}
