import { ApiService } from './api.service';
import { PaymentFilters } from './../models/payments-filters.model';
import { CreatePaymentModel } from './../models/create-payment.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class PaymentsService {

    constructor(private apiService: ApiService) { }

    get(filters: PaymentFilters): Observable<any> {
        return this.apiService.get('payments' + filters.toUrl());
    }

    create(model: CreatePaymentModel): Observable<any> {
        return this.apiService.post('payments', model);
    }
}
