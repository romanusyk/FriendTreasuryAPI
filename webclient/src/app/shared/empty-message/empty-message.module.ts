import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyMessageComponent } from './empty-message.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    EmptyMessageComponent
  ],
  exports: [
    EmptyMessageComponent
  ]
})
export class EmptyMessageModule { }
