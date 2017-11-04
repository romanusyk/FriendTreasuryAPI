import { PaymentsFilters } from './../models/payments-filters.model';
import { CreatePaymentModel } from './../models/create-payment.model';
import { PaymentDTO } from './../models/paymentDTO.model';
import { PagedCollection } from './../models/paged-collection.model';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { UrlParamsHelper } from './url-params.helper';

@Injectable()
export class PaymentsService {

  constructor(private apiService: ApiService) { }

  get(filters: PaymentsFilters): Observable<PagedCollection<PaymentDTO>> {
    return this.apiService.get('payments' + filters.toUrl());
  }

  create(model: CreatePaymentModel): Observable<any> {
    return this.apiService.post('payments', model);
  }
}
