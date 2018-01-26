import { Component, ViewChild, Inject } from '@angular/core';
import { BusyComponent } from '../../../../shared/components/busy/busy.component';
import { PaymentsDataService } from '../../../../shared/services/payments-data.service';
import { MdlDialogReference } from '@angular-mdl/core';
import { CUSTOM_MODAL_DATA } from '../../../../shared/injection.token';
import { Payment, EditPaymentModel } from '../../../../shared/models/payment.model';

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
    this.dialog.hide();
  }
}
