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
            headersConfig['Authorization'] = `Bearer ${user.token.value}`;
        }
        return new Headers(headersConfig);
    }

    private formatErrors(error: any) {
        return Observable.throw(error.json());
    }

    get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
        return this.http.get(`${this.config.endpoint}${path}`,
            { headers: this.setHeaders(), search: params })
            .catch(this.formatErrors)
            .map((res: Response) => res.json());
    }

    getData<T>(path: string, params: URLSearchParams = new URLSearchParams()): Observable<T> {
        return this.http.get(`${this.config.endpoint}${path}`,
            { headers: this.setHeaders(), search: params })
            .catch(this.formatErrors)
            .map( data => data.json());
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
            .map((res: Response) => res.json());
    }

    delete(path): Observable<any> {
        return this.http.delete(
            `${this.config.endpoint}${path}`,
            { headers: this.setHeaders() })
            .catch(this.formatErrors)
            .map((res: Response) => res.json());
    }
}
