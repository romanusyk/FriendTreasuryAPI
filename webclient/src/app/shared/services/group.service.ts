import { Observable } from 'rxjs/Rx';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';

import { PaymentsService } from './payments.service';
import { PaymentsFilters } from '../models/payments-filters.model';
import { Group } from '../models/group.model';
import { Payment } from '../models/payment.model';
import { PaymentDTO } from '../models/paymentDTO.model';

@Injectable()
export class GroupService {
    constructor(private apiService: ApiService, private paymentsService: PaymentsService) { }

    getGroups(): Observable<any> {
        return this.apiService.get('groups/my');
    }

    getWithPayments(userId: number): Observable<any> {
        const filters = new PaymentsFilters();
        filters.sum = true;
        filters.user = userId;
        filters.group = 0;
        return Observable.forkJoin(
            this.getGroups(),
            this.paymentsService.get(filters)
        ).map(
            (data: Array<any>) => this.enrich(data[0], data[1])
        );
    }

    private enrich(groups: Array<Group>, payments: Array<PaymentDTO>): Array<Group> {
        payments.forEach((payment: PaymentDTO) => {
            if (!!payment && !!payment.group) {
                const group = groups.find((item: Group) => payment.group.id === item.id);
                group.amount = payment.amount;
            }
        });
        return groups;
    }
}
