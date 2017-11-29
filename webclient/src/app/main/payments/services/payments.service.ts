import { Injectable } from '@angular/core';
import { PaymentFilters } from '../../../shared/models/payments-filters.model';
import { CreatePaymentModel } from '../../../shared/models/create-payment.model';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../../shared/services/api.service';


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
