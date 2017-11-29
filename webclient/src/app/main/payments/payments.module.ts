import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { AmountColorDirective } from './directives/amount-color.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdlModule } from '@angular-mdl/core';
import { AvatarModule } from 'ngx-avatar';
import { MdlDatePickerModule } from '@angular-mdl/datepicker';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'ng2-toastr';
import { CreatePaymentModalComponent } from './components/create-payment-modal/create-payment-modal.component';
import { PaymentUserComponent } from './components/payment-user/payment-user.component';
import { PaymentFiltersComponent } from './components/payment-filters/payment-filters.component';
import { PaymentsListComponent } from './components/payments-list/payments-list.component';
import { PaymentComponent } from './components/payments-list/payment/payment.component';
import { DebtComponent } from './components/debts-list/debt/debt.component';
import { DebtsListComponent } from './components/debts-list/debts-list.component';
import { PaymentFiltersService } from './services/payment-filters.service';
import { VirtualScrollModule } from 'angular2-virtual-scroll';

@NgModule({
  imports: [
    AvatarModule,
    CommonModule,
    FormsModule,
    MdlDatePickerModule,
    MdlModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    VirtualScrollModule,
    ToastModule.forRoot(),
  ],
  declarations: [
    AmountColorDirective,
    CreatePaymentModalComponent,
    DebtComponent,
    DebtsListComponent,
    PaymentComponent,
    PaymentFiltersComponent,
    PaymentsListComponent,
    PaymentUserComponent
  ],
  exports: [
    AmountColorDirective,
    CreatePaymentModalComponent,
    DebtsListComponent,
    PaymentFiltersComponent,
    PaymentsListComponent
  ],
  providers: [
    PaymentFiltersService
  ]
})
export class PaymentsModule { }
