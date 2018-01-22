import { AuthDataService } from './../services/auth-data.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IAppConfig } from '../../config/iapp.config';
import { Injectable } from '@angular/core';
import { ConfigManager } from '../../config/app.config';
@Injectable()
export class LoginGuard implements CanActivate {
  private config: IAppConfig;
  constructor(private authService: AuthDataService, private router: Router) {
    this.config = ConfigManager.config;
  }
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (!this.authService.isAuthorized()) {
      return true;
    }
    this.router.navigateByUrl(this.config.routes.main);
  }
}
