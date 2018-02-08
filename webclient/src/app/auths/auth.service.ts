import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ErrorsList } from '../core/erros/error.model';
import { CredentialsType } from '../core/auth/credentials.model';
import { FtValidators } from '../core/validators/ft-validators';

@Injectable()
export class AuthService {
  constructor(private fb: FormBuilder) { }

  public onFormValueChanged(data: any, form: FormGroup, errors: ErrorsList): ErrorsList {
    console.log('validation')
    errors.clear();
    for (const key in form.controls) {
      const control = form.get(key);
      if (control && control.dirty && !control.valid) {
        const message = ValidationMessages[key];
        if (!!message) {
          for (const error in control.errors) {
            errors.push(key, message[error]);
          }
        }
      }
    }
    return errors;
  }

  public getCredentialsType(data: string): CredentialsType {
    switch (data) {
      case 'login':
        return CredentialsType.Login;
      case 'register':
        return CredentialsType.Register;
      default:
        return CredentialsType.Login;
    }
  }

  public buildRegisterForm(form: FormGroup): FormGroup {
    form.addControl('phone', new FormControl('', [
      Validators.required,
      FtValidators.Length(8, 12)
    ]));
    form.addControl('confirmPassword', new FormControl('', [
      Validators.required,
      FtValidators.EqualTo(form.controls['password'])
    ]));
    form.addControl('email', new FormControl('', [
      Validators.required,
      Validators.email
    ]));

    return form;
  }

  public buildLoginForm(form: FormGroup): FormGroup {
    form.removeControl('phone');
    form.removeControl('email');
    form.removeControl('confirm-password');
    return form;
  }

  public buildForm(): FormGroup {
    return this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  public markFormAsDirtyAndTouched(form: FormGroup) {
    form.markAsDirty();
    form.markAsTouched();
    for (const key in form.controls) {
      const control = form.get(key);
      control.markAsDirty();
      control.markAsUntouched();
    }
  }
}

export const ValidationMessages = {
  username: {
    required: 'Username is required'
  },
  password: {
    required: 'Password is required'
  },
  phone: {
    required: 'Phone is required',
    range: 'Phone should be in range [8:12]'
  },
  confirmPassword: {
    required: 'Password confirmation is required',
    equalTo: 'Password\'s doesn\'t match'
  },
  email: {
    required: 'Email is required',
    email: 'Email address not valid'
  }
};
