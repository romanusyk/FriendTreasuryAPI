import { PaymentsFiltersComponent } from './components/payments-filters/payments-filters.component';
import { MdlSelectModule } from '@angular-mdl/select';
import { CreatePaymentComponent } from './components/create-payment/create-payment/create-payment.component';
import { PaymentsListComponent } from './components/payments-list/payments-list.component';
import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GroupListComponent } from './components/group-list/group-list.component';
// Angular Imports
import { NgModule } from '@angular/core';
import { AvatarModule } from 'ngx-avatar';
// This Module's Components
import { IndexComponent } from './components/index/index.component';
import { MdlModule, MdlDialogModule } from '@angular-mdl/core';
import { BusyModule } from 'angular2-busy';
import { SearchComponent } from './components/search/search/search.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MdlModule,
        MdlSelectModule,
        SharedModule,
        MdlDialogModule.forRoot(),
        BusyModule,
        AvatarModule
    ],
    declarations: [
        GroupListComponent,
        PaymentsListComponent,
        CreatePaymentComponent,
        IndexComponent,
        PaymentsFiltersComponent,
        SearchComponent
    ],
    exports: [
    ]
})
export class IndexModule {

}
