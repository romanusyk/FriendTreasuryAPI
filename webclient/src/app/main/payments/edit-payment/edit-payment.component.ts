import { Component, Inject, ViewChild } from '@angular/core';

import { EditPaymentModel } from '../../../core/payments/payment.model';
import { PaymentsDataService } from '../../../core/payments/payments-data.service';
import { BusyComponent } from '../../../shared/busy/busy.component';

@Component({
  selector: 'ft-edit-payment',
  templateUrl: './edit-payment.component.html',
  styleUrls: ['./edit-payment.component.scss']
})

export class EditPaymentComponent {
  @ViewChild('loading') loading: BusyComponent;
  public payment: EditPaymentModel;
  constructor(
    private paymentService: PaymentsDataService) {}

  public onEditClick() {
    this.loading.show();
    this.paymentService.edit(this.payment).subscribe(
      () => {
        this.payment.isEdited = true;
        this.onCancelClick();
      },
      () => {
        this.onCancelClick();
      }
    );
  }

  public onCancelClick() {
    this.loading.hide();
  }
}
