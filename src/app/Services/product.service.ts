import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Designation } from '../types/designation';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  options = {
    headers: new HttpHeaders().set('Content-Type','application/json')
  }

constructor(private http: HttpClient) { }

create(nome: string){
  let body = {
    designation: nome
  }
  return this.http.post<Designation>('http://54.162.158.231:8080/api/v1/product-designation',body).pipe(
    map(
      (res: Designation) => {
        console.log(res)
      },
    )
  )
}

getAll(): Observable<Designation[]>{
  return this.http.get<Designation[]>('http://54.162.158.231:8080/api/v1/product-designation', this.options);
}

get(id:string): Observable<Designation>{
  return this.http.get<Designation>('http://54.162.158.231:8080/api/v1/product-designation', this.options);
}


delete(id: string){
  return this.http.delete(`http://54.162.158.231:8080/api/v1/product-designation/${id}`)
}

edit(id: string, nome: string){
  let body = {
    designation: nome
  }
  console.log(id)
  console.log(nome)
  return this.http.put<Designation>(`http://54.162.158.231:8080/api/v1/product-designation/${id}`,body).pipe(
    map(
      (res: Designation) => {
        console.log(res)
      },
    )
  )
}

}
