import { CreatePaymentModel } from './../models/create-payment.model';
import { PaymentDTO } from './../models/paymentDTO.model';
import { PagedCollection } from './../models/paged-collection.model';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PaymentsService {

    constructor(private apiService: ApiService) { }

    get(groupId: number, page: number = 0, size: number = 50): Observable<PagedCollection<PaymentDTO>> {
        return this.apiService.get(`payments?group=${groupId}&page=${page}&size=${size}`);
    }

    create(model: CreatePaymentModel): Observable<any> {
        return this.apiService.post('payments', model);
    }
}
