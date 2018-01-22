import { AuthDataService } from './../services/auth-data.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { IAppConfig } from '../../config/iapp.config';
import { Inject, Injectable } from '@angular/core';
import { ConfigManager } from '../../config/app.config';
@Injectable()
export class MainGuard implements CanActivate {
  constructor(private authService: AuthDataService) {}
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.authService.isAuthorized()) {
      return true;
    }
    this.authService.logout();
  }
}
