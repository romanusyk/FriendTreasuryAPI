export class Group {
    id: number;
    title: string;
    amount?: number;
    name?: string;
    constructor(id?, title?) {
        this.id = id;
        this.title = title;
    }
}
