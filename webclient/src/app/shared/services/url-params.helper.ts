export class UrlParamsHelper {
  private params: UrlParam[];
  constructor(...params: UrlParam[]) { this.params = params; }
  push(param: UrlParam) { this.params.push(param); }
  add(name: string, value: any) { this.params.push({ name: name, value: value }); }
  toString() { return '?' + this.params.map(p => p.name + '=' + p.value).join('&'); }
}

export interface UrlParam {
  name: string;
  value: any;
}
