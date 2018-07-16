import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ServerErrorResponse } from '@core/erros/server-error.model';
import {throwError} from '@app/rxjs.import';

export const toPayload = <T>(action: any) => action.payload;

export const toBody = <T>(response: HttpResponse<T>) => response.body;

export const toError = (response: HttpErrorResponse) => throwError((<ServerErrorResponse>response.error).message);
