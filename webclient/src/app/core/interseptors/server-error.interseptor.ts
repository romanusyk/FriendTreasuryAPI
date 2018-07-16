import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '@app/config/app.config';
import { Observable } from 'rxjs';


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
            this.router.navigate([AppConfig.routes.serverError], { replaceUrl: true });
        }

        return Observable.throw(err);
    }
}
