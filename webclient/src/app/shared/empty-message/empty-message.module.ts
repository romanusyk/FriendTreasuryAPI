import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyMessageComponent } from './empty-message.component';
import { MdlIconModule, MdlButtonModule } from '@angular-mdl/core';

@NgModule({
  imports: [
    CommonModule,
    MdlIconModule.forRoot(),
    MdlButtonModule.forRoot()
  ],
  declarations: [
    EmptyMessageComponent
  ],
  exports: [
    EmptyMessageComponent
  ]
})
export class EmptyMessageModule { }
