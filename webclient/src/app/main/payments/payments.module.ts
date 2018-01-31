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
import { CreatePaymentModalComponent } from './create-payment-modal/create-payment-modal.component';
import { DebtComponent } from './debt/debt.component';
import { DebtsListComponent } from './debts-list/debts-list.component';
import { EditPaymentComponent } from './edit-payment/edit-payment.component';
import { PaymentFiltersComponent } from './payment-filters/payment-filters.component';
import { PaymentUserComponent } from './payment-user/payment-user.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import { AmountColorDirective } from './amount-color-directive/amount-color.directive';
import { MapModalComponent } from './map-modal/map-modal.component';

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
    DebtsListComponent,
    MapModalComponent
  ],
  exports: [
    AmountColorDirective,
    CreatePaymentModalComponent,
    PaymentFiltersComponent,
    PaymentsListComponent,
    DebtsListComponent,
    MapModalComponent
  ],
  entryComponents: [
    EditPaymentComponent
  ]
})
export class PaymentsModule { }
