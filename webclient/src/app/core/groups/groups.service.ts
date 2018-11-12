import { HttpClient } from '@angular/common/http';
import { Group } from './group.model';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';

import { PaymentsDataService } from '../payments/payments-data.service';
import { Payment } from '../payments/payment.model';
import { PaymentFilters } from '../payment-filters/payments-filters.model';
import { filter } from 'rxjs/operators/filter';


@Injectable()
export class GroupsService {
    constructor(private http: HttpClient, private paymentsService: PaymentsDataService) { }

    public getGroups(): Observable<any> {
        return this.http.get('api/groups/my');
    }

    public create(group: Group): Observable<any> {
        return this.http.post('api/groups', group);
    }

    public edit(group: Group): Observable<any> {
        return this.http.patch('api/groups', group);
    }

}
