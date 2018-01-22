import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorsList } from './../shared/models/error.model';
import { Injectable } from '@angular/core';
import { CredentialsType } from '../shared/models/credentials.model';
import { FtValidators } from '../shared/validators/ft-validators';
import { FormBuilder } from '@angular/forms/src/form_builder';

@Injectable()
export class AuthService {
  constructor(private fb: FormBuilder) { }

  public onFormValueChanged(data: any, form: FormGroup, errors: ErrorsList): ErrorsList {
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
        return CredentialsType.login;
      case 'register':
        return CredentialsType.register;
      default:
        return CredentialsType.login;
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
