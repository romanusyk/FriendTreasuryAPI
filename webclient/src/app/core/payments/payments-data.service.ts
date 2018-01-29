import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { CreatePaymentModel, Payment } from './payment.model';
import { PaymentFilters } from '../payment-filters/payments-filters.model';


@Injectable()
export class PaymentsDataService {

    constructor(private http: HttpClient) { }

    public get(filters: PaymentFilters): Observable<any> {

        return this.http.get('api/payments' + filters.toUrl());
    }

    public create(model: CreatePaymentModel): Observable<any> {
        return this.http.post('api/payments', model);
    }

    public delete(id: number): Observable<any> {
        return this.http.delete(`api/payments?paymentID=${id}`);
    }

    public edit(payment: Payment): Observable<any> {
        return this.http.put(`api/payments`, payment);
    }
}
