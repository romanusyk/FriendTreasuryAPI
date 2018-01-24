import { Payment } from './../../../../shared/models/payment.model';
import { PaymentFiltersService } from './../../services/payment-filters.service';
import { MdlDialogReference } from '@angular-mdl/core';
import { PaymentsService } from './../../../../shared/services/payments.service';
import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { AppPreferencesService } from '../../../../shared/services/app-preferences.service';
import { BusyComponent } from '../../../../shared/components/busy/busy.component';
import { CUSTOM_MODAL_DATA } from '../../injection.token';

@Component({
  selector: 'ft-edit-payment',
  templateUrl: './edit-payment.component.html',
  styleUrls: ['./edit-payment.component.scss']
})

export class EditPaymentComponent {
  @ViewChild('loading') loading: BusyComponent;
  constructor(
    private paymentService: PaymentsService,
    private paymentFiltersService: PaymentFiltersService,
    private dialog: MdlDialogReference,
    @Inject(CUSTOM_MODAL_DATA) public payment: Payment) {}

  public onEditClick() {
    this.loading.show();
    this.paymentService.edit(this.payment).subscribe(
      () => {
        this.paymentFiltersService.reload();
        this.loading.hide();
        this.dialog.hide();
      },
      () => {
        this.loading.hide();
        this.dialog.hide();
      }
    );
  }

  public onCancelClick() {
    this.dialog.hide();
  }
}
