import { AbstractControl, ValidatorFn } from '@angular/forms';

export const Length = (min: number, max?: number): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: boolean } => {
        if (!min) { return null; }
        const value: number = control.value.toString().length;
        if (!!max) {
            console.log(value);
            return value >= min && value <= max ? null : { range: true };
        }
        return value >= min ? null : { range: true };
    };
};
