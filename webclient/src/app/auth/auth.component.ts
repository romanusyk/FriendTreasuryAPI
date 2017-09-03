import { Errors } from './../shared/models/errors.model';
import { ApiService, UserService } from './../shared/index';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authType: String = 'login';
  errors: Object = new Errors();
  authForm: FormGroup;
  title = 'Login';
  loading = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder) {
    this.authForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }
  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = this.isLogin() ? 'Sign in' : 'Sign up';
      if (this.isLogin()) {
        try {
          this.authForm.removeControl('phone');
        } catch (e) {
        }
      } else {
        this.authForm.addControl('phone', new FormControl('', [Validators.required, Validators.maxLength(12)]));
      }
    });
    this.authForm.valueChanges.subscribe(p => this.onValueChange(p, this.authForm));

  }
  submitForm() {
    this.loading = true;
    this.errors = new Errors();
    const credentials = this.authForm.value;
    this.userService
      .attemptAuth(this.authType, credentials)
      .subscribe(
      data => this.router.navigateByUrl('/index'),
      err => {
        this.errors = err;
        this.loading = false;
      }
      );
  }

  onValueChange(data: any, form) {
    for (const key in form.controls) {
      if (form.controls.hasOwnProperty(key)) {
        const control = form.get(key);
        if (control && control.dirty && !control.valid) {
          const message = ValidationMessages[key];
          for (const error in control.errors) {
            if (form.controls.hasOwnProperty(key)) {
            }
          }
        }
      }
    }
  }

  isLogin(): Boolean {
    return this.authType === 'login';
  }

}

export const ValidationMessages = {
  'username': {
    'required': 'Обязательное поле.'
  },
  'password': {
    'required': 'Обязательное поле.'
  },
  'phone': {
    'required': 'Обязательное поле.',
    'maxlength': 'Обязательное поле.'
  }
};

