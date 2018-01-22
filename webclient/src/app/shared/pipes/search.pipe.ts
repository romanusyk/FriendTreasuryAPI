import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchBy'
})

export class SearchPipe implements PipeTransform {
    public transform(items: any[], value: string, field?: string): any {
        if (!items || !value) {
            return items;
        }
        if (field) {
            return items.filter(val => this.compare(val[field], value));
        }
        return items.filter(val => val === value);
    }

    private compare(val1: any, val2: string): boolean {
        const string1 = val1.toString().toLocaleLowerCase();
        const string2 = val2.toString().toLocaleLowerCase();

        if (!val1 || !val2) {
            return false;
        }
        return string1.includes(string2) || string2.toString().includes(string1);
    }
}
