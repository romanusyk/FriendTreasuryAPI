import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common/src/common_module";
import { FormControlErrorMessagesComponent } from "./form-control-error-messages.component";


@NgModule({
  imports: [
    CommonModule
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
