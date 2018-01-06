import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { InviteComponent } from './invite.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule,
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
