import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SearchPipe } from './search.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SearchPipe
  ],
  exports: [
    SearchPipe
  ]
})
export class SearchPipeModule { }
