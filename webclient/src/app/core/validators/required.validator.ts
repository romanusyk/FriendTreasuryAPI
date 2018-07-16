import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export const RequireValidator = (name: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors => {
    const value: string = control.value;

    return value && value.trim() ? null : { required: `${name} is required` };
  };
};
