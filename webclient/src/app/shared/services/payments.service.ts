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

  get(groupId: number, page: number = 0, size: number = 50): Observable<PagedCollection<PaymentDTO>> {
    return this.apiService.get('payments',
      new UrlParamsHelper(
        { name: 'group', value: groupId },
        { name: 'page', value: page },
        { name: 'size', value: size }
      ));
  }

  create(model: CreatePaymentModel): Observable<any> {
    return this.apiService.post('payments', model);
  }
}
