import { UrlParamsHelper, UrlParam } from './../services/url-params.helper';
export class PaymentsFilters {
    public sum: boolean;
    public group: number;
    public from: number;
    public to: number;
    public page = 0;
    public size = 50;

    public toUrl(): string {
        const helper = new UrlParamsHelper();
        helper.add('page', this.page);
        helper.add('size', this.size);
        if (!!this.from) {
            helper.add('userFrom', this.from);
        }
        if (!!this.to) {
            helper.add('userTo', this.to);
        }
        if (!!this.group && this.group > 0) {
            helper.add('group', this.group);
        }
        if (!!this.sum) {
            return '/sum' + helper.toString();
        }
        return helper.toString();
    }
}
