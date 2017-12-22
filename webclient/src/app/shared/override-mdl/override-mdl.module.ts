import { FtCheckBoxComponent } from './checkbox/checkbox.component';
import { FtTextFieldComponent } from './text-field/text-field.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdlModule } from '@angular-mdl/core';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [MdlModule, FormsModule, CommonModule],
    exports: [FtTextFieldComponent, FtCheckBoxComponent],
    declarations: [FtTextFieldComponent],
    providers: [],
})
export class OverrideMDLModule { }
