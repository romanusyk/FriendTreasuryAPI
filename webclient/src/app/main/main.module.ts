import { PaymentUserComponent } from './payments-list/payment-user/payment-user.component';
import { PaymentComponent } from './payments-list/payment/payment.component';
import { ConfigManager } from './../config/app.config';
import { CreateGroupComponent } from './create-group/create-group.component';
import { PaymentsFiltersComponent } from './payments-filters/payments-filters.component';
import { MdlSelectModule } from '@angular-mdl/select';
import { CreatePaymentComponent } from './create-payment/create-payment.component';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GroupListComponent } from './group-list/group-list.component';
import { NgModule } from '@angular/core';
import { AvatarModule } from 'ngx-avatar';
import { MdlModule, MdlDialogModule, MdlButtonModule } from '@angular-mdl/core';
import { BusyModule } from 'angular2-busy';
import { SearchComponent } from './search/search/search.component';
import { ClipboardModule } from 'ngx-clipboard';
import { MainPageComponent } from './main-page/main-page.component';
import { MdlDatePickerModule } from '@angular-mdl/datepicker';
import { AgmCoreModule } from '@agm/core';
const config = ConfigManager.config;
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MdlModule,
        MdlSelectModule,
        SharedModule,
        MdlDialogModule.forRoot(),
        BusyModule,
        AvatarModule,
        ClipboardModule,
        MdlDatePickerModule
    ],
    declarations: [
        GroupListComponent,
        PaymentsListComponent,
        CreatePaymentComponent,
        MainPageComponent,
        PaymentsFiltersComponent,
        SearchComponent,
        CreateGroupComponent,
        PaymentComponent,
        PaymentUserComponent
    ],
    exports: [
    ],
    providers: [DatePipe]
})
export class MainModule {

}
