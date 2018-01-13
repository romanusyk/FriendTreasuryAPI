import { ConfigManager } from './../config/app.config';
import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GroupListComponent } from './group-list/group-list.component';
import { NgModule } from '@angular/core';
import { AvatarModule } from 'ngx-avatar';
import { MdlModule, MdlDialogModule, MdlButtonModule } from '@angular-mdl/core';
import { ClipboardModule } from 'ngx-clipboard';
import { MainPageComponent } from './main-page/main-page.component';
import { MdlDatePickerModule } from '@angular-mdl/datepicker';
import { AgmCoreModule } from '@agm/core';
import { PaymentsModule } from './payments/payments.module';
import { OverrideMDLModule } from '../shared/override-mdl/override-mdl.module';
import { RightMenuComponent } from './right-menu/right-menu.component';
import { ManageGroupComponent } from './manage-group/manage-group.component';
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
