import { User } from './user.model';
export class Group {
    id: number;
    title: string;
    amount?: number;
    name?: string;
    users?: User[]
    constructor(id?, title?) {
        this.id = id;
        this.title = title;
    }
}
