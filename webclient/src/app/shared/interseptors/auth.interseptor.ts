import { UserStorageService } from './../services/user-storage.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http/src/response';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private userStorageService: UserStorageService) {
        this.handleError = this.handleError.bind(this);
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.authService.isAuthorized()) {
            this.authService.logout();
            return Observable.throw('');
        }
        const token = this.userStorageService.get();
        const cloned = request.clone({
            setHeaders: {
                'X-Auth-Token' : token.token
            }
        });
        return next.handle(cloned).catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse): Observable<HttpEvent<any>> {
        const { status, url } = err;
        if (status === 401) {
            this.authService.logout();
        }
        return Observable.throw(err);
    }
}
