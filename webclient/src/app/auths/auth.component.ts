import { AuthService } from './auth.service';
import { IAppConfig } from './../config/iapp.config';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { ConfigManager } from '../config/app.config';
import { CredentialsType } from '../core/auth/credentials.model';
import { BusyComponent } from '../shared/busy/busy.component';
import { ErrorsList } from '../core/erros/error.model';
import { SubscriptionList } from '../shared/subscription.model';
import { AuthDataService } from '../core/auth/auth-data.service';
import { InviteService } from '../core/invite/invite.service';
import { ErrorTransformingService } from '../core/erros/error-transforming.service';
@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AuthService]
})
export class AuthComponent implements OnInit, OnDestroy {
  authType = CredentialsType.Login;
  title: string;
  config: IAppConfig;
  subscription: SubscriptionList;
  errors = new ErrorsList();
  authForm: FormGroup;

  @ViewChild(BusyComponent) loading: BusyComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authDataService: AuthDataService,
    private authService: AuthService,
    private inviteService: InviteService,
    private errorTransforming: ErrorTransformingService) {
    this.authForm = this.authService.buildForm();
    this.subscription = new SubscriptionList();
    this.config = ConfigManager.config;
  }
  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = this.authService.getCredentialsType(data[data.length - 1].path);
      this.updateTitle();
      if (this.isLogin()) {
        this.authService.buildLoginForm(this.authForm);
      } else {
        this.authService.buildRegisterForm(this.authForm);
      }
    });
    this.subscription.add(this.authForm.valueChanges
      .subscribe(p => this.authService.onFormValueChanged(p, this.authForm, this.errors))
    );
    this.authForm.updateValueAndValidity();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public submitForm() {
    if (this.authForm.invalid) {
      this.authService.markFormAsDirtyAndTouched(this.authForm);
      this.authForm.updateValueAndValidity();
      return;
    }
    this.errors.clear();
    const credentials = this.authForm.value;
    this.loading.show();
    this.subscription.add(this.authDataService
      .attemptAuth(this.authType, credentials)
      .subscribe(() => {
        const name = this.inviteService.get();
        if (!name) {
          this.router.navigateByUrl(this.config.routes.main);
        } else {
          this.router.navigateByUrl(this.config.routes.invite + '/' + name);
        }
        this.loading.hide();
      },
        (err) => {
          this.errors.push('*', this.errorTransforming.transformServerError(err));
          this.loading.hide();
        }));
  }


  public isLogin(): Boolean {
    return this.authType === CredentialsType.Login;
  }

  private updateTitle(): void {
    this.title = this.isLogin() ? 'Sign in' : 'Sign up';
  }
}
