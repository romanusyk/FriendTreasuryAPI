import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserStorageService } from '../services/user-storage.service';
import { IAppConfig } from '../../config/iapp.config';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '../../config/app.config';
import { UserService } from '../services/user.service';
@Injectable()
export class MainGuard implements CanActivate {
  private config: IAppConfig;
  constructor(private userService: UserService, @Inject(APP_CONFIG) appConfig: IAppConfig, private router: Router) {
    this.config = appConfig;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.userService.isAuthorized()) {
      return true;
    }
    this.router.navigateByUrl(this.config.routes.login);
  }
}
