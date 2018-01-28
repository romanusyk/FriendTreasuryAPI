import { HttpClient } from '@angular/common/http';
import { Group } from './../models/group.model';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';

import { PaymentFilters } from '../models/payments-filters.model';
import { Payment } from '../models/payment.model';
import { PaymentsDataService } from './payments-data.service';

@Injectable()
export class GroupService {
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

    public getWithPayments(userId: number): Observable<any> {
        const filters = new PaymentFilters();
        filters.sum = true;
        filters.user = userId;
        filters.group = 0;
        return this.paymentsService.get(filters)
            .map((payment: Payment) => new Group(payment.group, payment.amount));
    }
}
