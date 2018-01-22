import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router
    ) {
        this.handleError = this.handleError.bind(this);
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse): Observable<HttpEvent<any>> {
        const { status, url } = err;

        if (status === 500) {
            this.router.navigate(['/500'], { replaceUrl: true });
        }

        return Observable.throw(err);
    }
}
