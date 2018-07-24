import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http/src/response';
import { TokenStorageService } from '../auth/token-storage.service';
import { TokenService } from '../auth/token.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService, private storage: TokenStorageService) {
        this.handleError = this.handleError.bind(this);
    }
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.tokenService.isAuthorized()) {
            return next.handle(request)
        }
        const token = this.storage.get();
        const cloned = request.clone({
            setHeaders: {
                'X-Auth-Token' : token.token
            }
        });
        return next.handle(cloned);
    }

    private handleError(err: HttpErrorResponse): Observable<HttpEvent<any>> {
        const { status } = err;
        if (status === 401) {
            this.tokenService.logout();
        }
        return Observable.throw(err);
    }
}
