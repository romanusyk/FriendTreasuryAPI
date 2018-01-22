import { User } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getUsersInGroup(groupId: number): Observable<any> {
    return this.http.get('api/users/group/' + groupId);
  }

  getUserInfo(): Observable<any> {
    return this.http.get('api/users/me');
  }

  getUserStatistics(): Observable<any> {
    return this.http.get('api/users/statistics');
  }
}
