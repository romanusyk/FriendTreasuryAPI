import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export const LengthValidator = (name: string, min: number, max?: number): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors => {
        if (!min) { return null; }
        const value: number = control.value.toString().length;
        if (max) {
            return value >= min && value <= max ? null : { range: `${name} should be in range [${min}:${max}]`};
        }
        return value >= min ? null : { range: `${name} length should be more than ${min - 1}` };
    };
};
