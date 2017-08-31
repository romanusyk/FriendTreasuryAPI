import { Observable } from 'rxjs/Rx';
import { UserCacheService } from './user-cache.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import '../rx-js.operators';
@Injectable()
export class ApiService {
constructor(
    private http: Http,
    private userCacheUser: UserCacheService
  ) {}

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.userCacheUser.getUser()) {
      headersConfig['Authorization'] = `Bearer ${this.userCacheUser.getUser().token}`;
    }
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
     return Observable.throw(error.json());
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${environment.api_endpoint}${path}`, { headers: this.setHeaders(), search: params })
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_endpoint}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }

  patch(path: string, body: Object = {}): Observable<any> {
    return this.http.patch(
      `${environment.api_endpoint}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_endpoint}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_endpoint}${path}`,
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }
}
