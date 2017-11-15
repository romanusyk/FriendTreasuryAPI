import { User } from './../models/user.model';
import { Credentials, CredentialsType } from './../models/credentials.model';
import { UserStorageService } from './user-storage.service';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ApiService } from './api.service';
import { DateHelper } from './date.helper';

@Injectable()
export class UserService {
  constructor(
    private apiService: ApiService,
    private userStorageService: UserStorageService
  ) {
  }

  getUsersInGroup(groupId: number): Observable<Array<User>> {
    return this.apiService.get('users/group/' + groupId);
  }

  getUserInfo() {
    return this.apiService.get('users/me');
  }

}
