import { Component } from '@angular/core';
import { ChangeEvent } from 'angular2-virtual-scroll';

import { PaymentFiltersDataService } from '../../../core/payment-filters/payment-filters-data.service';
import { Payment } from '../../../core/payments/payment.model';
import { PaymentsDataService } from '../../../core/payments/payments-data.service';
import { AppPreferencesService } from '../../../core/preferences/app-preferences.service';
import { BasePaymentsListComponent } from '../payments-base.component';
import { PaymentModalsService } from './../payment-modals.service';

@Component({
  selector: 'ft-payments',
  templateUrl: 'payments-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentsListComponent extends BasePaymentsListComponent {
  public scrollItems: Array<Payment>;
  public isLoading: boolean;
  public totalItems: number;

  constructor(private paymentService: PaymentsDataService,
              private paymentModalsService: PaymentModalsService,
              filtersDataService: PaymentFiltersDataService,
              preferencesService: AppPreferencesService) {
    super(filtersDataService, preferencesService);
  }

  public onListChange(event: ChangeEvent) {
    if (event.end !== this.payments.length || this.isLoading || this.totalItems === this.payments.length) {
      return;
    }
    this.filters.page++;
    this.updateData();
  }

  public updateData() {
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

  public onDeletePaymentClick(id: number) {
    const subscription = this.paymentModalsService.showDeletePaymentModal()
      // .mergeMap(() => {
      //   this.loading.show();
      //   return this.paymentService.delete(id);
      // })
      .subscribe(() => {
        this.loading.hide();
        this.reloadData();
        subscription.unsubscribe();
      }, () => {
        this.loading.hide();
        subscription.unsubscribe();
      });
  }

  public onEditPaymentClick(payment: Payment) {
    // const subscription = this.paymentModalsService.showEditPaymentModal(payment)
    //   .subscribe((isEdited: boolean) => {
    //     if (isEdited) {
    //       this.reloadData();
    //     }
    //     subscription.unsubscribe();
    //   });
  }

  public isPaymentReadonly(payment: Payment) {
    return payment.userFrom.id !== this.preferences.currentUser.id;
  }

  public onToClick(id: number) {
    this.filtersDataService.changeFilters({
      to: this.filters.to === id ? 0 : id,
      page: 0
    });
  }

  public onFromClick(id: number) {
    this.filtersDataService.changeFilters({
      from: this.filters.from === id ? 0 : id,
      page: 0
    });
  }

  public onShowOnMapClick(payment: Payment) {
    this.preferencesService.mapModal.show({
      latitude: payment.latitude,
      longitude: payment.longitude,
      zoom: 15,
      marker: {
        latitude: payment.latitude,
        longitude: payment.longitude
      }
    });
  }

  private reloadData() {
    this.filtersDataService.reload();
    this.subscription.add(this.preferencesService.refreshStatistics().subscribe());
    // this.subscription.add(this.preferencesService.updateGroupList().subscribe());
  }
}
