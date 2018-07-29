import { OverrideMDLModule } from './../shared/override-mdl/override-mdl.module';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MdlModule, MdlButtonModule, MdlIconModule } from '@angular-mdl/core';
import { FtTextFieldModule } from '../shared/override-mdl/text-field/text-field.module';
import { BusyModule } from '../shared/busy/busy.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        FtTextFieldModule,
        BusyModule,
        MdlButtonModule.forRoot(),
        MdlIconModule.forRoot()
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
