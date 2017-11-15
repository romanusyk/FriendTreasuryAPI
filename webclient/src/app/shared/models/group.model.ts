export class Group {
    id: number;
    title: string;
    amount?: number = 0;
    constructor(id?, title?) {
        this.id = id;
        this.title = title;
    }
}
