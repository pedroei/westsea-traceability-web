import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../types/produto';

@Injectable({
  providedIn: 'root'
})
export class TraceabilityService {

  options = {
    headers: new HttpHeaders().set('Content-Type','application/json')
  }

constructor(private http: HttpClient) { }

getProducts(): Observable<Produto[]>{
  return this.http.get<Produto[]>('http://54.162.158.231:8080/api/v1/traceability/product', this.options);
}

getTrace(referenceNumber:string): Observable<Produto>{
  return this.http.get<Produto>(`http://54.162.158.231:8080/api/v1/traceability/${referenceNumber}`, this.options);
}

}
