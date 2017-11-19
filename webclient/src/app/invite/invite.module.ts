import { BusyModule } from 'angular2-busy';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { InviteComponent } from './invite.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule,
        BusyModule
    ],
    declarations: [
        InviteComponent,
    ],
    exports: [
        InviteComponent,
    ],
})
export class InviteModule {
}
