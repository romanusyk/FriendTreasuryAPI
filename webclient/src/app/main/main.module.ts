import { MdlDialogModule, MdlModule } from '@angular-mdl/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'ngx-avatar';
import { ClipboardModule } from 'ngx-clipboard';

import { OverrideMDLModule } from '../shared/override-mdl/override-mdl.module';
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
        MdlModule,
        SharedModule,
        MdlDialogModule.forRoot(),
        AvatarModule,
        ClipboardModule,
        PaymentsModule,
        OverrideMDLModule,
        GroupsModule
    ],
    declarations: [
        MainPageComponent,
        RightMenuComponent
    ]
})
export class MainModule {

}
