import { Error } from './error.model';
import { Injectable } from '@angular/core';
import { ServerError } from './server-error.model';
import {HttpErrorResponse} from '@angular/common/http';
@Injectable()
export class ErrorTransformingService {

  transformServerError(err: HttpErrorResponse ): string {
    let message = (<ServerError>err.error).exception;
    if (!message) {
      message = 'ServerError';
    }
    let lastIndex = message.lastIndexOf('.');
    lastIndex = lastIndex === -1 ? 0 : (lastIndex + 1);
    const exception = message.substring(lastIndex);
    return ServerExeptions[exception];
  }
}

export const ServerExeptions = {
  'NotValidPasswordException': 'Please check your username or password',
  'ServerError': 'Sorry, but server has Errror'
};
