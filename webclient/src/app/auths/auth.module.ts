import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AuthComponent } from './components/auth.component';
import { MdlModule } from '@angular-mdl/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        MdlModule,
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
