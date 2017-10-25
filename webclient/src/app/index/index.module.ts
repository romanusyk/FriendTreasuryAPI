import { CreatePaymentComponent } from './components/create-payment/create-payment/create-payment.component';
import { PaymentsListComponent } from './components/payments-list/payments-list.component';
import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GroupListComponent } from './components/group-list/group-list.component';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { IndexComponent } from './components/index/index.component';
import { MdlModule } from '@angular-mdl/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MdlModule,
        SharedModule
    ],
    declarations: [
        GroupListComponent,
        PaymentsListComponent,
        CreatePaymentComponent,
        IndexComponent
    ],
    exports: [
        GroupListComponent,
        IndexComponent,
        PaymentsListComponent,
        CreatePaymentComponent
    ]
})
export class IndexModule {

}
