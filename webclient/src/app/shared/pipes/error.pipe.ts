import { ServerError } from './../models/server-error.model';
import { Error } from './../models/error.model';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'error'
})

export class ErrorPipe implements PipeTransform {
    transform(value: ServerError): Error {
        const message = value.message;
        let lastIndex = message.lastIndexOf('.');
        lastIndex = lastIndex === -1 ? 0 : lastIndex;
        const exeption = message.substring(lastIndex);
        return new Error(ServerExeptions[exeption]);
    }
}

export const ServerExeptions = {
    'NotValidPasswordException': 'Please check your username or password',
    'ServerError': 'Sorry, but server has Errror'
};
