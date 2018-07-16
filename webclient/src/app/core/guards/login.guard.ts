import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenService } from '../auth/token.service';
import { AppConfig } from '@app/config/app.config';
@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {
  }
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (!this.tokenService.isAuthorized()) {
      return true;
    }
    this.router.navigateByUrl(AppConfig.routes.main);
  }
}
