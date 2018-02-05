import { Error } from './error.model';
import { Injectable } from '@angular/core';
import { ServerError } from './server-error.model';
@Injectable()
export class ErrorTransformingService {

  transformServerError(err: ServerError): string {
    let message = err.exception;
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
