import { SubscriptionList } from './../../../shared/models/subscription.model';
import { Preferences } from './../../../shared/models/preferences.model';
import { PagedCollection } from './../../../shared/models/paged-collection.model';
import { ChangeEvent } from 'angular2-virtual-scroll';
import { PaymentsService } from './../../../shared/services/payments.service';
import { PaymentFiltersService } from './../services/payment-filters.service';
import { Subscription } from 'rxjs/Rx';
import { PaymentFilters } from './../../../shared/models/payments-filters.model';
import { DebtModel } from './../../../shared/models/debt.model';
import { PaymentDTO } from './../../../shared/models/paymentDTO.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppPreferencesService } from '../../../shared/services/app-preferences.service';

@Component({
  selector: 'ft-payments',
  templateUrl: 'payments-entry.component.html',
  styleUrls: ['./payments-entry.component.scss']
})

export class PaymentsEntryComponent implements OnInit, OnDestroy {
  public scrollItems: Array<PaymentDTO>;
  public allowToProcessChanging: boolean;
  public filters: PaymentFilters;
  public isLoading: boolean;
  public totalItems: number;
  public payments: Array<DebtModel | PaymentDTO>;
  public preferences: Preferences;
  public subscription: SubscriptionList;
  constructor(private filtersService: PaymentFiltersService,
    private paymentService: PaymentsService,
    private preferencesService: AppPreferencesService) {
    this.subscription = new SubscriptionList();
  }

  ngOnInit() {
    this.allowToProcessChanging = true;
    this.filters = new PaymentFilters();
    this.payments = new Array();
    this.subscription.add(this.filtersService.onFiltersChanged.subscribe(
      (data: PaymentFilters) => {
        if (!data) {
          return;
        }
        if (this.allowToProcessChanging) {
          Object.assign(this.filters, data);
          this.reload();
        } else {
          this.allowToProcessChanging = true;
        }
      }
    ));

    this.subscription.add(this.preferencesService.preferencesChanged.subscribe(data => {
      this.preferences = data;
    }));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onToClick(id: number) {
    this.filters.to = id;
    this.filters.page = 0;
    this.allowToProcessChanging = false;
    this.filtersService.changeFilters(this.filters);
    this.reload();
  }

  onFromClick(id: number) {
    this.filters.from = id;
    this.filters.page = 0;
    this.allowToProcessChanging = false;
    this.filtersService.changeFilters(this.filters);
    this.reload();
  }
  onListChange(event: ChangeEvent) {
    if (event.end !== this.payments.length || this.isLoading || this.totalItems === this.payments.length) {
      return;
    }
    this.filters.page++;
    this.updateData();
  }

  public reload() {
    this.payments = [];
    this.totalItems = 0;
    this.updateData();
  }

  updateData() {
    this.isLoading = true;
    if (this.filters.page === 0) {
      this.preferencesService.loading.show();
    }
    const subscription = this.paymentService.get(this.filters).subscribe(
      (data) => {
        if (!this.filters.sum) {
          this.payments = this.payments.concat(data.content);
          this.totalItems = data.totalElements;
        } else {
          this.payments = data;
        }
        this.preferencesService.loading.hide();
        this.isLoading = false;
        subscription.unsubscribe();
      },
      (err) => {
        console.log(err);
        this.preferencesService.loading.hide();
        this.isLoading = false;
        subscription.unsubscribe();
      }
    );
  }

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
