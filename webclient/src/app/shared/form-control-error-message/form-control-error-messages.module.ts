import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KeysPipeModule } from '@shared/keys/keysPipe.module';

import { FormControlErrorMessagesComponent } from './form-control-error-messages.component';


@NgModule({
  imports: [
    CommonModule,
    KeysPipeModule
  ],
  declarations: [
    FormControlErrorMessagesComponent
  ],
  exports: [
    FormControlErrorMessagesComponent
  ]
})
export class FormControlErrorMessagesModule{
}
