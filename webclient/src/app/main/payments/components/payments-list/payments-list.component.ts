import { EditPaymentComponent } from './../edit-payment/edit-payment.component';
import { PaymentFiltersDataService } from './../../services/payment-filters-data.service';
import { ChangeEvent } from 'angular2-virtual-scroll';
import { AppPreferencesService } from './../../../../shared/services/app-preferences.service';
import { ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
import { PaymentFiltersService } from './../payment-filters/payment-filters.service';
import { PaymentsDataService } from './../../../../shared/services/payments-data.service';
import { Preferences } from './../../../../shared/models/preferences.model';
import { PaymentFilters } from './../../../../shared/models/payments-filters.model';
import { CUSTOM_MODAL_DATA } from './../../../../shared/injection.token';
import { SubscriptionList } from './../../../../shared/models/subscription.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Payment } from '../../../../shared/models/payment.model';
import { BusyComponent } from '../../../../shared/components/busy/busy.component';

@Component({
  selector: 'ft-payments',
  templateUrl: 'payments-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentsListComponent implements OnInit {
  public scrollItems: Array<Payment>;
  public isLoading: boolean;
  public totalItems: number;
  public payments: Array<Payment>;
  public subscription: SubscriptionList;
  public preferences: Preferences;
  public filters: PaymentFilters;

  @ViewChild(BusyComponent) loading;
  constructor(private filtersDataService: PaymentFiltersDataService,
    private paymentService: PaymentsDataService,
    private dialogService: MdlDialogService,
    private route: ActivatedRoute,
    private preferencesService: AppPreferencesService) {
    this.subscription = new SubscriptionList();
  }

  ngOnInit() {
    this.preferences = this.preferencesService.preferences;
    this.filters = this.filtersDataService.getCurrent();
    this.subscription.add(this.filtersDataService.onFiltersChanged.subscribe(this.reload.bind(this)));
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
      this.loading.show();
    }
    const subscription = this.paymentService.get(this.filters).subscribe(
      (data) => {
        if (!this.filters.sum) {
          this.payments = this.payments.concat(data.content);
          this.totalItems = data.totalElements;
        } else {
          this.payments = data;
        }
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
    this.dialogService.showCustomDialog({
      component: EditPaymentComponent,
      providers: [
        { provide: CUSTOM_MODAL_DATA, useValue: Object.assign({}, payment) }
      ]
    }).subscribe();
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
