import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IAppConfig } from '../../config/iapp.config';
import { Injectable } from '@angular/core';
import { ConfigManager } from '../../config/app.config';
import { TokenService } from '../auth/token.service';
@Injectable()
export class LoginGuard implements CanActivate {
  private config: IAppConfig;
  constructor(private tokenService: TokenService, private router: Router) {
    this.config = ConfigManager.config;
  }
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (!this.tokenService.isAuthorized()) {
      return true;
    }
    this.router.navigateByUrl(this.config.routes.main);
  }
}
