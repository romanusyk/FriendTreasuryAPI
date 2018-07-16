import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export const EqualToValidator = (errorMessage: string, equalControl: AbstractControl): ValidatorFn => {
  let subscribe = false;

  return (control: AbstractControl): ValidationErrors => {
    if (!subscribe) {
      subscribe = true;
      equalControl.valueChanges.subscribe(() => {
        control.updateValueAndValidity();
      });
    }

    const value: string = control.value;

    return equalControl.value === value ? null : {equalTo: errorMessage};
  };
};
