export class UrlParamsHelper {
  private params: UrlParam[];
  constructor(...params: UrlParam[]) { this.params = params; }
  public push(param: UrlParam) { this.params.push(param); }
  public add(name: string, value: any) { this.params.push({ name: name, value: value }); }
  public toString(): string { return '?' + this.params.map(p => p.name + '=' + p.value).join('&'); }
}

export interface UrlParam {
  name: string;
  value: any;
}
