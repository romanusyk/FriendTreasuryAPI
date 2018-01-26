import { Component, OnInit, ViewChild } from '@angular/core';
import { Debt } from '../../../shared/models/debt.model';
import { BusyComponent } from '../../../shared/components/busy/busy.component';
import { Payment } from '../../../shared/models/payment.model';
import { Preferences } from '../../../shared/models/preferences.model';
import { PaymentFilters } from '../../../shared/models/payments-filters.model';
import { SubscriptionList } from '../../../shared/models/subscription.model';
import { PaymentFiltersDataService } from '../services/payment-filters-data.service';
import { AppPreferencesService } from '../../../shared/services/app-preferences.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

export abstract class BasePaymentsListComponent implements OnInit, OnDestroy {
  public payments: Array<Payment | Debt>;
  public subscription: SubscriptionList;
  public preferences: Preferences;
  public filters: PaymentFilters;

  @ViewChild(BusyComponent) loading;
  constructor(private filtersDataService: PaymentFiltersDataService,
    private preferencesService: AppPreferencesService) {
    this.subscription = new SubscriptionList();
  }

  ngOnInit() {
    this.preferences = this.preferencesService.preferences;
    this.filters = this.filtersDataService.getCurrent();
    this.subscription.add(this.filtersDataService.onFiltersChanged.subscribe(this.reload.bind(this)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private reload() {
    this.payments = [];
    this.updateData();
  }

  abstract updateData();

  isAllowToShowPayments() {
    return !(this.isAllowToShowEmptyMessage() || this.filters.sum);
  }

  isAllowToShowEmptyMessage() {
    return !(this.payments && this.payments.length > 0);
  }

  getEmptyMessage() {
    if (!(this.preferences && this.preferences.currentGroup)) {
      return 'Please, chose group from list to show payments';
    } else {
      return 'You currently have no payments, please click button below to create one';
    }
  }

  getActionText() {
    if (this.preferences && this.preferences.currentGroup) {
      return 'create payment';
    } else {
      return '';
    }
  }

  onCreatePaymentCLick() {
    this.preferencesService.showCreatePaymentDialog();
  }
}
