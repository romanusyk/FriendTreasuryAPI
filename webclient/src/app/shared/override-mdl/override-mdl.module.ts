import { FtCheckBoxComponent } from './checkbox/checkbox.component';
import { FtTextFieldComponent } from './text-field/text-field.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdlModule } from '@angular-mdl/core';
import { NgModule } from '@angular/core';
import { RightDrawerComponent } from './right-drawer/right-drawer.component';


@NgModule({
    imports: [MdlModule, FormsModule, CommonModule],
    exports: [FtTextFieldComponent, FtCheckBoxComponent, RightDrawerComponent],
    declarations: [FtTextFieldComponent, FtCheckBoxComponent, RightDrawerComponent],
    providers: [],
})
export class OverrideMDLModule { }
