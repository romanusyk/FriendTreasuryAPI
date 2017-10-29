import { ErrorPipe } from './../pipes/error.pipe';
import { Error } from './../models/error.model';
import { IAppConfig } from './../../config/iapp.config';
import { APP_CONFIG } from './../../config/app.config';
import { UserStorageService } from './user-storage.service';
import { Observable } from 'rxjs/Rx';

import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ApiService {
    private config: IAppConfig;
    constructor(
        private http: Http,
        @Inject(APP_CONFIG) appConfig: IAppConfig,
        private userStorageService: UserStorageService
    ) {
        this.config = appConfig;
    }

    private setHeaders(): Headers {
        const headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        const user = this.userStorageService.get();
        if (user) {
            headersConfig['X-Auth-Token'] = `${user.token.token}`;
        }
        return new Headers(headersConfig);
    }



    get(path: string, params?: URLSearchParams): Observable<any> {
        return this.http.get(`${this.config.endpoint}${path}`,
            { headers: this.setHeaders(), search: params })
            .catch(this.formatErrors)
            .map((res: Response) => res.json());
    }

    getData<T>(path: string, params?: URLSearchParams): Observable<T> {
        return this.http.get(`${this.config.endpoint}${path}`,
            { headers: this.setHeaders(), search: params })
            .catch(this.formatErrors)
            .map(data => data.json());
    }

    put(path: string, body: Object = {}): Observable<any> {
        return this.http.put(
            `${this.config.endpoint}${path}`,
            JSON.stringify(body),
            { headers: this.setHeaders() })
            .catch(this.formatErrors)
            .map((res: Response) => res.json());
    }

    patch(path: string, body: Object = {}): Observable<any> {
        return this.http.patch(
            `${this.config.endpoint}${path}`,
            JSON.stringify(body),
            { headers: this.setHeaders() })
            .catch(this.formatErrors)
            .map((res: Response) => res.json());
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.http.post(
            `${this.config.endpoint}${path}`,
            JSON.stringify(body),
            { headers: this.setHeaders() })
            .catch(this.formatErrors)
            .map((res: Response) => {
                if (res['_body']) {
                    return res.json();
                }
                return res;
            });
    }

    delete(path): Observable<any> {
        return this.http.delete(
            `${this.config.endpoint}${path}`,
            { headers: this.setHeaders() })
            .catch(this.formatErrors)
            .map((res: Response) => res.json());
    }

    private generateServerError(): Promise<any> {
        return Promise.resolve({
            exception: 'ServerError'
        });
    }

    private formatErrors(error: Response): Observable<any> {
        if (error.status >= 500 || typeof (error.type === 'cors')) {
            return Observable.throw(this.generateServerError.bind(this)());
        }
        return Observable.throw(error.json());
    }
}
