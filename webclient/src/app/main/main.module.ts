import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClipboardModule } from 'ngx-clipboard';

import { SharedModule } from './../shared/shared.module';
import { GroupsModule } from './groups/groups.module';
import { MainPageComponent } from './main-page/main-page.component';
import { PaymentsModule } from './payments/payments.module';
import { RightMenuComponent } from './right-menu/right-menu.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule,
        ClipboardModule,
        PaymentsModule,
        GroupsModule
    ],
    declarations: [
        MainPageComponent,
        RightMenuComponent
    ]
})
export class MainModule {

}
