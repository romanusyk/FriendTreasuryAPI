export class Group {
    id: number;
    title: string;
    amount?: number;
    constructor(id?, title?) {
        this.id = id;
        this.title = title;
    }
}
