import { MdlCheckboxModule } from '@angular-mdl/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FtCheckBoxComponent } from './checkbox.component';

@NgModule({
  imports: [
    CommonModule,
    MdlCheckboxModule.forRoot(),
    FormsModule
  ],
  declarations: [
    FtCheckBoxComponent
  ],
  exports: [
    FtCheckBoxComponent
  ]
})
export class FtCheckboxModule { }
