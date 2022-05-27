export class URLReader {
  public params;

  constructor() {
    this.params = this.getParams();
  }

  public transformToAssocArray(prmstr: any): {} {
    const params: any = {};
    const prmarr = prmstr.split('&');
    for (let i = 0; i < prmarr.length; i++) {
      const tmparr = prmarr[i].split('=');
      params[tmparr[0].toLowerCase()] = tmparr[1];
    }
    return params;
  }

  public getParams(): any
  {
    const prmstr = window.location.search.substr(1);
    return prmstr != null && prmstr !== ''
      ? this.transformToAssocArray(prmstr)
      : {};
  }

  public getParam(key: string, oldVal: any = null) {
    if (this.params[key.toLowerCase()]) {
      return this.params[key.toLowerCase()];
    }
    return oldVal;
  }
}
