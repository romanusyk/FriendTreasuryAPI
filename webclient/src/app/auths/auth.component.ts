import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { AppState } from '@app/app.state';
import { AuthLogin, AuthRegister } from '@app/auths/state/auth.actions';
import { Observable } from '@app/rxjs.import';
import { Store, select } from '@ngrx/store';
import { BusyComponent } from '@shared/busy/busy.component';

import { AuthDataService } from './auth-data.service';
import { AuthService } from './auth.service';
import { CredentialsType } from './models/credentials.model';
import { selectErrorMessage } from './state/auth.state';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AuthService]
})
export class AuthComponent implements OnInit, OnDestroy {
  private authType = CredentialsType.Login;
  public title: string;
  public authForm: FormGroup;
  public errorMessage$: Observable<string>;

  @ViewChild(BusyComponent) loading: BusyComponent;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.authForm = this.authService.buildForm();
    this.errorMessage$ = this.store.pipe(select(selectErrorMessage));
  }
  ngOnInit() {
    this.route.url.subscribe((data: UrlSegment[]) => {
      this.authType = this.authService.getCredentialsType(
        data[data.length - 1].path
      );
      this.updateTitle();
      if (this.isLogin()) {
        this.authService.buildLoginForm(this.authForm);
      } else {
        this.authService.buildRegisterForm(this.authForm);
      }
    });
  }
  ngOnDestroy() {}

  public submitForm() {
    if (this.authForm.invalid) {
      this.authService.markFormAsDirtyAndTouched(this.authForm);
      return;
    }
    const credentials = this.authForm.value;
    this.loading.show();
    if (this.isLogin()) {
      this.store.dispatch(new AuthLogin(credentials));
    } else {
      this.store.dispatch(new AuthRegister(credentials));
    }
  }

  public isLogin(): Boolean {
    return this.authType === CredentialsType.Login;
  }

  private updateTitle(): void {
    this.title = this.isLogin() ? 'Sign in' : 'Sign up';
  }
}
