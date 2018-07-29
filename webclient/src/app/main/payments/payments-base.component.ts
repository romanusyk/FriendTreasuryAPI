import {Component, OnInit, ViewChild} from '@angular/core';
import {OnDestroy} from '@angular/core/src/metadata/lifecycle_hooks';
import {Payment} from '../../core/payments/payment.model';
import {Debt} from '../../core/payments/debt.model';
import {SubscriptionList} from '../../shared/subscription.model';
import {Preferences} from '../../core/preferences/preferences.model';
import {PaymentFilters} from '../../core/payment-filters/payments-filters.model';
import {BusyComponent} from '../../shared/busy/busy.component';
import {PaymentFiltersDataService} from '../../core/payment-filters/payment-filters-data.service';
import {AppPreferencesService} from '../../core/preferences/app-preferences.service';

export abstract class BasePaymentsListComponent implements OnInit, OnDestroy {
  public payments: Array<Payment | Debt>;
  public subscription: SubscriptionList;
  public preferences: Preferences;
  public filters: PaymentFilters;

  @ViewChild(BusyComponent) loading;

  constructor(protected filtersDataService: PaymentFiltersDataService,
              protected preferencesService: AppPreferencesService) {
    this.subscription = new SubscriptionList();
    this.updateData = this.updateData.bind(this);
  }

  ngOnInit() {
    this.preferences = this.preferencesService.preferences;
    this.filters = this.filtersDataService.getCurrent();
    this.subscription.add(this.filtersDataService.onFiltersChanged.subscribe(this.reload.bind(this)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.payments = [];
  }

  private reload(filters?: PaymentFilters) {
    if (!filters) {
      return;
    }
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
