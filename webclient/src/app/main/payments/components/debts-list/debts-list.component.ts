import { Component, OnInit } from '@angular/core';
import { BasePaymentsListComponent } from '../payments-base.component';
import { PaymentFiltersDataService } from '../../services/payment-filters-data.service';
import { PaymentsDataService } from '../../../../shared/services/payments-data.service';
import { AppPreferencesService } from '../../../../shared/services/app-preferences.service';

@Component({
  selector: 'ft-debts',
  templateUrl: 'debts-list.component.html',
  styleUrls: ['./debts-list.component.scss']
})
export class DebtsListComponent extends BasePaymentsListComponent {

  constructor(
    private paymentService: PaymentsDataService,
    filtersDataService: PaymentFiltersDataService,
    preferencesService: AppPreferencesService) {
    super(filtersDataService, preferencesService);
  }

  updateData() {
    this.loading.show();
    const subscription = this.paymentService.get(this.filters).subscribe(
      (data) => {
        this.payments = this.payments.concat(data.content);
        this.loading.hide();
        subscription.unsubscribe();
      },
      (err) => {
        console.log(err);
        this.loading.hide();
        subscription.unsubscribe();
      }
    );
  }
}
