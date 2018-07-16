import { RequireValidator } from './required.validator';
import { EqualToValidator } from './equal-to.validator';
import { EmailValidator } from './email.validator';
import { LengthValidator } from './length.validator';

export const FtValidators = {
    EqualToValidator,
    LengthValidator,
    EmailValidator,
    RequireValidator
};
