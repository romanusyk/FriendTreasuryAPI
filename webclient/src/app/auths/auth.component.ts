import { IAppConfig } from './../config/iapp.config';
import { SubscriptionList } from './../shared/models/subscription.model';
import { InviteService } from './../shared/services/invite.service';
import { AuthService } from './../shared/services/auth.service';
import { FtValidators } from './../shared/validators/ft-validators';
import { Error, ErrorsList } from './../shared/models/error.model';
import { Credentials, CredentialsType } from './../shared/models/credentials.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { ErrorTransformingService } from '../shared/services/error-transforming.service';
import { BusyComponent } from '../shared/components/busy/busy.component';
import { ConfigManager } from '../config/app.config';
@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  authType = CredentialsType.login;
  title: string;
  config: IAppConfig;
  subscription: SubscriptionList;
  errors = new ErrorsList();
  authForm: FormGroup;
  @ViewChild(BusyComponent) loading: BusyComponent;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private inviteService: InviteService,
    private errorTransforming: ErrorTransformingService) {
    this.authForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.subscription = new SubscriptionList();
    this.config = ConfigManager.config;
  }
  ngOnInit() {
    this.route.url.subscribe(data => {
      this.setCredentialsType(data[data.length - 1].path);
      this.updateTitle();
      if (this.isLogin()) {
        this.authForm.removeControl('phone');
        this.authForm.removeControl('email');
        this.authForm.removeControl('confirm-password');
      } else {
        this.authForm.addControl('phone', new FormControl('', [
            Validators.required,
            FtValidators.Length(8, 12)
          ]));
        this.authForm.addControl('confirmPassword', new FormControl('', [
            Validators.required,
            FtValidators.EqualTo(this.authForm.controls['password'])
          ]));
        this.authForm.addControl('email', new FormControl('', [
            Validators.required,
            Validators.email
          ]));
      }
    });
    this.authForm.valueChanges.subscribe(p => this.onValueChange(p, this.authForm));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public submitForm() {
    this.errors.clear();
    const credentials = this.authForm.value;
    this.loading.show();
    this.subscription.add(this.authService
      .attemptAuth(this.authType, credentials)
      .subscribe(
      data => {
        const name = this.inviteService.get();
        if (!name) {
          this.router.navigateByUrl(this.config.routes.main);
        } else {
          this.router.navigateByUrl(this.config.routes.invite + name);
        }
        this.loading.hide();

      },
      (err) => {
        this.errors.push('*', this.errorTransforming.transformServerError(err));
        this.loading.hide();
      }));
  }

  public onValueChange(data: any, form: FormGroup) {
    this.errors.clear();
    for (const key in form.controls) {
      const control = form.get(key);
      if (control && control.dirty && !control.valid) {
        const message = ValidationMessages[key];
        if (!!message) {
          for (const error in control.errors) {
            this.errors.push(key, message[error]);
          }
        }
      }
    }
  }

  public isLogin(): Boolean {
    return this.authType === CredentialsType.login;
  }

  private setCredentialsType(data: string): void {
    switch (data) {
      case 'login':
        this.authType = CredentialsType.login;
        break;
      case 'register':
        this.authType = CredentialsType.register;
        break;
      default:
        this.authType = CredentialsType.login;
        break;
    }
  }

  private updateTitle(): void {
    this.title = this.isLogin() ? 'Sign in' : 'Sign up';
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
