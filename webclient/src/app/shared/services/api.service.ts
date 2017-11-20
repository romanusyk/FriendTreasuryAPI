import { AuthService } from './auth.service';
import { Error } from './../models/error.model';
import { IAppConfig } from './../../config/iapp.config';
import { UserStorageService } from './user-storage.service';
import { Observable, Subject } from 'rxjs/Rx';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UrlParamsHelper } from './url-params.helper';
import { ConfigManager } from '../../config/app.config';

@Injectable()
export class ApiService {
  private config: IAppConfig;
  public notAuthorize: Subject<any> = new Subject();
  constructor(
    private http: Http,
    private userStorageService: UserStorageService,
    private authService: AuthService
  ) {
    this.config = ConfigManager.config;
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
      .catch(this.formatErrors.bind(this))
      .map(this.defaultMap);
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${this.config.endpoint}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() })
      .catch(this.formatErrors.bind(this))
      .map(this.defaultMap);
  }

  patch(path: string, body: Object = {}): Observable<any> {
    return this.http.patch(
      `${this.config.endpoint}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() })
      .catch(this.formatErrors.bind(this))
      .map(this.defaultMap);
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${this.config.endpoint}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() })
      .catch(this.formatErrors.bind(this))
      .map(this.defaultMap);
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${this.config.endpoint}${path}`,
      { headers: this.setHeaders() })
      .catch(this.formatErrors.bind(this))
      .map(this.defaultMap);
  }


  private formatErrors(error: Response): Observable<any> {
    if (error.status >= 500) {
      return Observable.throw({
        exception: 'ServerError'
      });
    }
    if (error.status >= 400) {
      this.authService.logout();
    }
    return Observable.throw(error.json());
  }

  private defaultMap(res: Response) {
    if (res['_body']) {
      return res.json();
    }
    return res;
  }
}
