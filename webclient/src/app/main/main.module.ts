import { MdlDialogModule, MdlModule } from '@angular-mdl/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'ngx-avatar';
import { ClipboardModule } from 'ngx-clipboard';

import { OverrideMDLModule } from '../shared/override-mdl/override-mdl.module';
import { ConfigManager } from './../config/app.config';
import { SharedModule } from './../shared/shared.module';
import { GroupListComponent } from './group-list/group-list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ManageGroupComponent } from './manage-group/manage-group.component';
import { PaymentsModule } from './payments/payments.module';
import { RightMenuComponent } from './right-menu/right-menu.component';

const config = ConfigManager.config;
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
        OverrideMDLModule
    ],
    declarations: [
        GroupListComponent,
        MainPageComponent,
        ManageGroupComponent,
        RightMenuComponent
    ],
    exports: [
    ],
    providers: [DatePipe]
})
export class MainModule {

}
