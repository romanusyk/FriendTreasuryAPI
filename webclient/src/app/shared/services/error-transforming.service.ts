import { Injectable } from '@angular/core';
import { ServerError } from '../models/server-error.model';

@Injectable()
export class ErrorTransformingService {

  transformServerError(value: ServerError): Error {
    const message = value.exception;
    let lastIndex = message.lastIndexOf('.');
    lastIndex = lastIndex === -1 ? 0 : lastIndex;
    const exception = message.substring(lastIndex + 1);
    return new Error(ServerExeptions[exception]);
}
}

export const ServerExeptions = {
  'NotValidPasswordException': 'Please check your username or password',
  'ServerError': 'Sorry, but server has Errror'
};
