import { AuthService } from './auth.service';
import { PaymentDTO } from './../models/paymentDTO.model';
import { PaymentsService } from './payments.service';
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
import { PaymentFilters } from '../models/payments-filters.model';

@Injectable()
export class UserService {
  constructor(
    private apiService: ApiService,
    private paymentService: PaymentsService,
    private userStorageService: UserStorageService
  ) {
  }

  getUsersInGroup(groupId: number): Observable<Array<User>> {
    return this.apiService.get('users/group/' + groupId);
  }

  getUserInfo() {
    return this.apiService.get('users/me');
  }

  enrich(user: User) {
    const filters = new PaymentFilters();
    filters.sum = true;
    filters.user = user.id;
    return this.paymentService.get(filters)
      .map((data: Array<PaymentDTO>) => {
        if (data.length > 0) {
          user.debt = data[0].amount;
        } else {
          user.debt = 0;
        }
        return user;
      });
  }

}
