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
  authType: String = '';
  errors: Errors = new Errors();
  authForm: FormGroup;
  title = 'Login';
  loading = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder) {
    this.authForm = this.fb.group({
      'email': ['', Validators.required, Validators.email],
      'password': ['', Validators.required]
    });
  }
 ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
    });
  }
  submit() {
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

}
