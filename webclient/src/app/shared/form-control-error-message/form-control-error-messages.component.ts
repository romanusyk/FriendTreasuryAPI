import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'ft-form-control-error-messages',
  templateUrl: './form-control-error-messages.component.html',
  styleUrls: ['./form-control-error-messages.component.scss']
})
export class FormControlErrorMessagesComponent {
  @Input() control: AbstractControl;

  public hasError(): boolean {
    return this.control && this.control.dirty && this.control.invalid;
  }
}
