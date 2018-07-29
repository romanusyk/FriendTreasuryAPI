import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { InviteComponent } from './invite.component';
import {MdlDialogModule} from '@angular-mdl/core';
import {CopyTextModalModule} from '../shared/copy-text-modal/copy-text-modal.module';

@NgModule({
    imports: [
        SharedModule,
        RouterModule,
        MdlDialogModule,
        CopyTextModalModule
    ],
    declarations: [
        InviteComponent
    ],
    exports: [
        InviteComponent,
    ],
})
export class InviteModule {
}
