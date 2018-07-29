import { MdlIconModule, MdlTextFieldModule } from '@angular-mdl/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FtTextFieldComponent } from './text-field.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdlTextFieldModule.forRoot(),
    MdlIconModule.forRoot()
  ],
  declarations: [
    FtTextFieldComponent
  ],
  exports: [
    FtTextFieldComponent
  ]
})
export class FtTextFieldModule { }
