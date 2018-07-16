import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

  export const EmailValidator = (control: AbstractControl): ValidationErrors => {
    const regex = /(.+)@(.+){2,}\.(.+){2,}/;
    const value: string = control.value;

    return regex.test(value) ? null : { email: 'Please provide valid email' };
  }
