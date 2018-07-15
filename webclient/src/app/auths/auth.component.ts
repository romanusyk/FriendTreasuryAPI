import { AuthService } from './auth.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BusyComponent } from '@shared/busy/busy.component';
import { InviteService } from '../core/invite/invite.service';
import { CredentialsType } from './models/credentials.model';
import { AuthDataService } from './auth-data.service';
@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AuthService, AuthDataService]
})
export class AuthComponent implements OnInit, OnDestroy {
  authType = CredentialsType.Login;
  title: string;
  authForm: FormGroup;

  @ViewChild(BusyComponent) loading: BusyComponent;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService) {
    this.authForm = this.authService.buildForm();
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
