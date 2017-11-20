import { CreateGroupComponent } from './create-group/create-group.component';
import { PaymentsFiltersComponent } from './payments-filters/payments-filters.component';
import { MdlSelectModule } from '@angular-mdl/select';
import { CreatePaymentComponent } from './create-payment/create-payment.component';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GroupListComponent } from './group-list/group-list.component';
import { NgModule } from '@angular/core';
import { AvatarModule } from 'ngx-avatar';
import { MdlModule, MdlDialogModule, MdlButtonModule } from '@angular-mdl/core';
import { BusyModule } from 'angular2-busy';
import { SearchComponent } from './search/search/search.component';
import { ClipboardModule } from 'ngx-clipboard';
import { MainPageComponent } from './main-page/main-page.component';

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
        AvatarModule,
        ClipboardModule
    ],
    declarations: [
        GroupListComponent,
        PaymentsListComponent,
        CreatePaymentComponent,
        MainPageComponent,
        PaymentsFiltersComponent,
        SearchComponent,
        CreateGroupComponent
    ],
    exports: [
    ]
})
export class MainModule {

}
