import { MdlDialogReference } from '@angular-mdl/core';
import { Component, Inject, ViewChild } from '@angular/core';

import { CUSTOM_MODAL_DATA } from '../../../core/injection.token';
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
  constructor(
    private paymentService: PaymentsDataService,
    private dialog: MdlDialogReference,
    @Inject(CUSTOM_MODAL_DATA) public payment: EditPaymentModel) {}

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
    this.dialog.hide(this.payment);
  }
}
