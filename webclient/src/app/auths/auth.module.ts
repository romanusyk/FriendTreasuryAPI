import { MdlModule } from 'angular2-mdl';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AuthComponent } from './components/auth.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        MdlModule
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
