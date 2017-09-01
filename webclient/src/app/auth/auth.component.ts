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
  errors: Errors = new Errors();
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
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      console.log(data);
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      this.authForm.addControl('phone', new FormControl('', [Validators.required, Validators.maxLength(12)]));
      // add form control for username if this is the register page
      this.authForm.valueChanges.subscribe(this.onValueChange);
    });
  }
  submitForm() {
    this.loading = true;
    this.errors = new Errors();
    const credentials = this.authForm.value;
    this.userService
      .attemptAuth(this.authType, credentials)
      .subscribe(
      data => this.router.navigateByUrl('/'),
      err => {
        this.errors = err;
        this.loading = false;
      }
      );
  }

  onValueChange(data?: any) {
    console.log(data);
    for (const key in this.authForm.controls) {
      if (this.authForm.controls.hasOwnProperty(key)) {
        const control = this.authForm.get(key);
        if (control && control.dirty && !control.valid) {
          const message = ValidationMessages[key];
              for (const error in control.errors) {
                if (this.authForm.controls.hasOwnProperty(key)) {
                  // this.errors.errors()
              }
        }
      }
    }
  }
    // array.forEach(element => {
    // });
    // // tslint:disable-next-line:forin
    // this.authForm.controls.forEach((field: FormControl) => {
    //   const control = this.authForm.get(field);
    // });

    //   if (control && control.dirty && !control.valid) {
    //     const message = this.validationMessages[field];
    //     for (const key in control.errors) {
    //       this.formErrors[field] += message[key] + ' ';
    //     }
    //   }
    // }
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

