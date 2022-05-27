export class Helpers
{
  static ajaxLoad(url: string, onLoaded: any, type: string = 'GET') {
    const xhttp = new XMLHttpRequest();
    const scope = this;
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const obj = JSON.parse(this.responseText);
        if (onLoaded) {
          onLoaded(obj);
        }
      }
    };
    xhttp.open(type, url, true);
    xhttp.send();
  }
}
