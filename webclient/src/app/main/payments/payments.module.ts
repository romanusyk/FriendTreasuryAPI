import { MdlModule } from '@angular-mdl/core';
import { MdlDatePickerModule } from '@angular-mdl/datepicker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { AvatarModule } from 'ngx-avatar';

import { SharedModule } from '../../shared/shared.module';
import { OverrideMDLModule } from './../../shared/override-mdl/override-mdl.module';
import { CreatePaymentModalComponent } from './components/create-payment-modal/create-payment-modal.component';
import { DebtComponent } from './components/debt/debt.component';
import { DebtsListComponent } from './components/debts-list/debts-list.component';
import { EditPaymentComponent } from './components/edit-payment/edit-payment.component';
import { PaymentFiltersComponent } from './components/payment-filters/payment-filters.component';
import { PaymentUserComponent } from './components/payment-user/payment-user.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentsListComponent } from './components/payments-list/payments-list.component';
import { AmountColorDirective } from './directives/amount-color.directive';
import { PaymentFiltersDataService } from './services/payment-filters-data.service';

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
    OverrideMDLModule
  ],
  declarations: [
    AmountColorDirective,
    CreatePaymentModalComponent,
    DebtComponent,
    PaymentComponent,
    PaymentFiltersComponent,
    PaymentUserComponent,
    EditPaymentComponent,
    PaymentsListComponent,
    DebtsListComponent
  ],
  exports: [
    AmountColorDirective,
    CreatePaymentModalComponent,
    PaymentFiltersComponent,
    PaymentsListComponent,
    DebtsListComponent
  ],
  providers: [
    PaymentFiltersDataService
  ],
  entryComponents: [
    EditPaymentComponent
  ]
})
export class PaymentsModule { }
