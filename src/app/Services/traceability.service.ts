import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produto } from '../types/produto';

@Injectable({
  providedIn: 'root',
})
export class TraceabilityService {
  url = environment.apiUrl + '/v1/traceability';
  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.url}/product`, this.options);
  }

  getTrace(referenceNumber: string): Observable<Produto> {
    return this.http.get<Produto>(
      `${this.url}/${referenceNumber}`,
      this.options
    );
  }

  getPDF(productLotUuid: string, documentKey: string) {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json',
      //'responseType'  : 'blob' as 'json'        //This also worked
    };

    return this.http.get<any>(
      `${this.url}/product/${productLotUuid}/document/${documentKey}/download`,
      httpOptions
    );
  }
}
