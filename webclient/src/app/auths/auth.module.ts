import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MdlModule } from '@angular-mdl/core';
import { BusyModule } from 'angular2-busy';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        MdlModule,
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
