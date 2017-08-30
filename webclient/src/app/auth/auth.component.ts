import { Errors } from './../shared/models/errors.model';
import { ApiService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent {
  authType: String = '';
  errors: Errors = new Errors();
  isSubmitting = false;
  authForm: FormGroup;
  title = 'Login';
  loading = false;
  constructor(private _authService: ApiService) { }

  send(form: NgForm) {
    this.loading = true;
    this._authService.send(form.controls['name'], form.controls['password'], (f, data, status) => {
      this.loading = false;
      console.log(`${status}: ${data}`);
    });
  }

}
