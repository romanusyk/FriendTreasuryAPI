import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigManager } from '../../config/app.config';


@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router
    ) {
        this.handleError = this.handleError.bind(this);
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
    }

    private handleError(err: HttpErrorResponse): Observable<HttpEvent<any>> {
        const { status } = err;

        if (status === 500) {
            this.router.navigate([ConfigManager.config.routes.serverError], { replaceUrl: true });
        }

        return Observable.throw(err);
    }
}
