import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ErrorsList } from '@core/erros/error.model';
import { FtValidators } from '@core/validators/ft-validators';
import { CredentialsType } from './models/credentials.model';

@Injectable()
export class AuthService {
  constructor(private fb: FormBuilder) { }

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
      FtValidators.RequireValidator('Phone'),
      FtValidators.LengthValidator('Phone', 8, 12)
    ]));
    form.addControl('confirmPassword', new FormControl('', [
      FtValidators.RequireValidator('Password confirmation'),
      FtValidators.EqualToValidator('Passwords do not match', form.controls['password'])
    ]));
    form.addControl('email', new FormControl('', [
      FtValidators.RequireValidator('Email'),
      FtValidators.EmailValidator
    ]));

    return form;
  }

  public buildLoginForm(form: FormGroup): FormGroup {
    form.removeControl('phone');
    form.removeControl('email');
    form.removeControl('confirmPassword');
    return form;
  }

  public buildForm(): FormGroup {
    return this.fb.group({
      'username': ['', FtValidators.RequireValidator('Username')],
      'password': ['', FtValidators.RequireValidator('Password')]
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

