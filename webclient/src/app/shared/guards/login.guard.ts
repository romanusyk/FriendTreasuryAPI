import { AuthService } from './../services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { IAppConfig } from '../../config/iapp.config';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '../../config/app.config';
import { UserService } from '../services/user.service';
@Injectable()
export class LoginGuard implements CanActivate {
  private config: IAppConfig;
  constructor(private authService: AuthService, @Inject(APP_CONFIG) appConfig: IAppConfig, private router: Router) {
    this.config = appConfig;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (!this.authService.isAuthorized()) {
      return true;
    }
    this.router.navigateByUrl(this.config.routes.main);
  }
}
