import { AbstractControl, ValidatorFn } from '@angular/forms';

export const EqualTo = (equalControl: AbstractControl): ValidatorFn => {
  let subscribe = false;

  return (control: AbstractControl): {[key: string]: boolean} => {
    if (!subscribe) {
      subscribe = true;
      equalControl.valueChanges.subscribe(() => {
        control.updateValueAndValidity();
      });
    }

    const value: string = control.value;

    return equalControl.value === value ? null : {equalTo: true};
  };
};
