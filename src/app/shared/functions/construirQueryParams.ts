import { HttpParams } from '@angular/common/http';

export function construirQueryParams(obj: any): HttpParams {
  let params = new HttpParams();

  for (let llave in obj) {
    if (obj.hasOwnProperty(llave)) {
      params = params.append(llave, obj[llave]);
    }
  }

  return params;
}
