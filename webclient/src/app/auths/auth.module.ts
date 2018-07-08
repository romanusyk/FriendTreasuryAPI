import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BusyModule } from '../shared/busy/busy.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        BusyModule
    ],
    declarations: [
        AuthComponent,
    ],
    exports: [
        AuthComponent,
    ]
})
export class AuthModule {

}
