import { AuthService } from './auth.service';
import { IAppConfig } from './../config/iapp.config';
import { SubscriptionList } from './../shared/models/subscription.model';
import { InviteService } from './../shared/services/invite.service';
import { AuthDataService } from './../shared/services/auth-data.service';
import { Error, ErrorsList } from './../shared/models/error.model';
import { Credentials, CredentialsType } from './../shared/models/credentials.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { ErrorTransformingService } from '../shared/services/error-transforming.service';
import { BusyComponent } from '../shared/components/busy/busy.component';
import { ConfigManager } from '../config/app.config';
@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AuthService]
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
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public submitForm() {
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
          this.router.navigateByUrl(this.config.routes.invite + name);
        }
        this.loading.hide();
      },
      (err) => {
        this.errors.push('*', this.errorTransforming.transformServerError(err));
        this.loading.hide();
      }));
  }


  public isLogin(): Boolean {
    return this.authType === CredentialsType.login;
  }

  private updateTitle(): void {
    this.title = this.isLogin() ? 'Sign in' : 'Sign up';
  }
}
