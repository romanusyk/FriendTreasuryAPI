import { Injectable } from '@angular/core';

import { Payment, EditPaymentModel } from '../../core/payments/payment.model';
import { CreatePaymentModalComponent } from './create-payment-modal/create-payment-modal.component';
import { EditPaymentComponent } from './edit-payment/edit-payment.component';
import { Observable, of } from 'rxjs';
import { ModalService } from '../../core/modals/modal.service';
@Injectable()
export class PaymentModalsService {

  constructor(private modalService: ModalService) { }

  public showEditPaymentModal(payment: Payment) {
    // return this.dialogService.showCustomDialog({
    //   component: EditPaymentComponent,

    // })
    //   .mergeMap((editedPayment: EditPaymentModel) => {
    //     if (editedPayment.isEdited) {
    //       Object.assign(payment, editedPayment);
    //     }
    //     return Observable.of(editedPayment.isEdited);
    //   });
  }

  public showCreatePaymentModal(){
    return of(true);
  }

  public showDeletePaymentModal(){
    return of({});
  }
}
