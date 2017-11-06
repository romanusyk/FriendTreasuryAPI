import { AuthService } from './auth.service';
import { ErrorPipe } from './../pipes/error.pipe';
import { Error } from './../models/error.model';
import { IAppConfig } from './../../config/iapp.config';
import { APP_CONFIG } from './../../config/app.config';
import { UserStorageService } from './user-storage.service';
import { Observable, Subject } from 'rxjs/Rx';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UrlParamsHelper } from './url-params.helper';

@Injectable()
export class ApiService {
  private config: IAppConfig;
  public notAuthorize: Subject<any> = new Subject();
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

  get(path: string, params?: UrlParamsHelper): Observable<any> {
    let url = `${this.config.endpoint}${path}`;
    if (!!params) {
      url += params.toString();
    }
    return this.http.get(url,
      { headers: this.setHeaders() })
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  getData<T>(path: string, params?: UrlParamsHelper): Observable<T> {
    let url = `${this.config.endpoint}${path}`;
    if (!!params) {
      url += params.toString();
    }
    return this.http.get(url,
      { headers: this.setHeaders() })
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
      .catch(this.formatErrors.bind(this))
      .map((res: Response) => res.json());
  }


  private formatErrors(error: Response): Observable<any> {
    console.log(error);
    if (error.status >= 500) {
      return Observable.throw(Promise.resolve({
        exception: 'ServerError'
      }));
    }
    if (error.status === 400) {
      this.notAuthorize.next();
    }
    return Observable.throw(error.json());
  }
}
