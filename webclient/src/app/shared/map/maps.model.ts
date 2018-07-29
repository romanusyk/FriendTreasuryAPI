
export class MarkerOptions {
    public latitude?: number;
    public longitude?: number;
    public label?: string;
}

export class MapOptions extends MarkerOptions {
    public zoom?: number;
    public marker?: MarkerOptions;
}
