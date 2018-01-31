import {EditPaymentComponent} from './../edit-payment/edit-payment.component';
import {ChangeEvent} from 'angular2-virtual-scroll';
import {ActivatedRoute} from '@angular/router';
import {MdlDialogService, MdlDialogReference} from '@angular-mdl/core';
import {PaymentFiltersService} from './../payment-filters/payment-filters.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {BasePaymentsListComponent} from '../payments-base.component';
import {Payment, EditPaymentModel} from '../../../core/payments/payment.model';
import {PaymentsDataService} from '../../../core/payments/payments-data.service';
import {AppPreferencesService} from '../../../core/preferences/app-preferences.service';
import {PaymentFiltersDataService} from '../../../core/payment-filters/payment-filters-data.service';
import {CUSTOM_MODAL_DATA} from '../../../core/injection.token';
import 'rxjs/add/operator/mergeMap';

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
    this.dialogService.confirm('Delete payment?', 'No', 'Delete')
      .mergeMap(() => {
        this.loading.show();
        return this.paymentService.delete(id);
      })
      .subscribe(() => {
        this.loading.hide();
        this.payments = this.payments.filter((payment: Payment) => payment.id !== id);
        this.preferencesService.refreshStatistics().subscribe();
        this.preferencesService.updateGroupList.emit();
      }, () => {
        this.loading.hide();
      });
  }

  onEditPayment(payment: Payment) {
    const editPaymentModel: EditPaymentModel = Object.assign({}, payment);
    this.dialogService.showCustomDialog({
      component: EditPaymentComponent,
      providers: [
        {provide: CUSTOM_MODAL_DATA, useValue: editPaymentModel}
      ]
    })
      .mergeMap((data: MdlDialogReference) => data.onHide())
      .subscribe(() => {
        if (editPaymentModel.isEdited) {
          Object.assign(payment, editPaymentModel);
          this.preferencesService.refreshStatistics();
          this.preferencesService.updateGroupList.emit();
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
