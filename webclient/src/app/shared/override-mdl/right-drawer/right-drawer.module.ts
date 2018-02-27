import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RightDrawerComponent } from './right-drawer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RightDrawerComponent
  ],
  exports: [
    RightDrawerComponent
  ]
})
export class RightDrawerModule { }
