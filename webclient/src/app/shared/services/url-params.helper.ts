export class UrlParamsHelper {
  private params: UrlParam[];
  constructor(...params: UrlParam[]) { this.params = params; }
  add(param: UrlParam) { this.params.push(param); }
  toString() { return '?' + this.params.map(p => p.name + '=' + p.value).join('&'); }
}

export interface UrlParam {
  name: string;
  value: any;
}
