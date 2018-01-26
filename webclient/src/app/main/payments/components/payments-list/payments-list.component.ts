import { EditPaymentComponent } from './../edit-payment/edit-payment.component';
import { PaymentFiltersDataService } from './../../services/payment-filters-data.service';
import { ChangeEvent } from 'angular2-virtual-scroll';
import { AppPreferencesService } from './../../../../shared/services/app-preferences.service';
import { ActivatedRoute } from '@angular/router';
import { MdlDialogService, MdlDialogReference } from '@angular-mdl/core';
import { PaymentFiltersService } from './../payment-filters/payment-filters.service';
import { PaymentsDataService } from './../../../../shared/services/payments-data.service';
import { Preferences } from './../../../../shared/models/preferences.model';
import { PaymentFilters } from './../../../../shared/models/payments-filters.model';
import { CUSTOM_MODAL_DATA } from './../../../../shared/injection.token';
import { SubscriptionList } from './../../../../shared/models/subscription.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Payment, EditPaymentModel } from '../../../../shared/models/payment.model';
import { BusyComponent } from '../../../../shared/components/busy/busy.component';
import { BasePaymentsListComponent } from '../payments-base.component';

@Component({
  selector: 'ft-payments',
  templateUrl: 'payments-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentsListComponent extends BasePaymentsListComponent {
  public scrollItems: Array<Payment>;
  public isLoading: boolean;
  public totalItems: number;

  constructor(
    private paymentService: PaymentsDataService,
    private dialogService: MdlDialogService,
    filtersDataService: PaymentFiltersDataService,
    preferencesService: AppPreferencesService) {
    super(filtersDataService, preferencesService);
  }

  onListChange(event: ChangeEvent) {
    if (event.end !== this.payments.length || this.isLoading || this.totalItems === this.payments.length) {
      return;
    }
    this.filters.page++;
    this.updateData();
  }

  updateData() {
    this.isLoading = true;
    if (this.filters.page === 0) {
      this.loading.show();
    }
    const subscription = this.paymentService.get(this.filters).subscribe(
      (data) => {
        this.payments = this.payments.concat(data.content);
        this.totalItems = data.totalElements;
        this.loading.hide();
        this.isLoading = false;
        subscription.unsubscribe();
      },
      (err) => {
        console.log(err);
        this.loading.hide();
        this.isLoading = false;
        subscription.unsubscribe();
      }
    );
  }

  onDeletePayment(id: number) {
    this.dialogService.confirm('Delete payment?', 'No', 'Yes  ').subscribe(() => {
      this.loading.show();
      this.paymentService.delete(id).subscribe(() => {
        this.loading.hide();
        this.payments.slice(this.payments.findIndex(payment => payment.id !== id), 1);
      },
        (err) => {
          this.loading.hide();
          console.log(err);
        });
    });
  }

  onEditPayment(payment: Payment) {
    const editPaymentModel: EditPaymentModel = Object.assign({}, payment);
    this.dialogService.showCustomDialog({
      component: EditPaymentComponent,
      providers: [
        { provide: CUSTOM_MODAL_DATA, useValue: editPaymentModel }
      ]
    })
      .flatMap((data: MdlDialogReference) => data.onHide())
      .subscribe(() => {
        if (editPaymentModel.isEdited) {
          Object.assign(payment, editPaymentModel);
        }
      });
  }

  isPaymentReadonly(payment: Payment) {
    return payment.userFrom.id !== this.preferences.currentUser.id;
  }

  onToClick(id: number) {
    this.filtersDataService.changeFilters({
      to: this.filters.to === id ? 0 : id,
      page: 0
    });
  }

  onFromClick(id: number) {
    this.filtersDataService.changeFilters({
      from: this.filters.from === id ? 0 : id,
      page: 0
    });
  }
}
