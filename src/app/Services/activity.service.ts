import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Designation } from '../types/designation';


@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  options = {
    headers: new HttpHeaders().set('Content-Type','application/json')
  }

constructor(private http: HttpClient) { }

create(nome: string){
  let body = {
    designation: nome
  }
  return this.http.post<Designation>('http://54.162.158.231:8080/api/v1/activity-designation',body).pipe(
    map(
      (res: Designation) => {
        console.log(res)
      },
    )
  )
}

getAll(): Observable<Designation[]>{
  return this.http.get<Designation[]>('http://54.162.158.231:8080/api/v1/activity-designation', this.options);
}

get(id:string): Observable<Designation>{
  return this.http.get<Designation>('http://54.162.158.231:8080/api/v1/activity-designation', this.options);
}


delete(id: string){
  return this.http.delete(`http://54.162.158.231:8080/api/v1/activity-designation/${id}`)
}

edit(id: string, nome: string){
  let body = {
    designation: nome
  }
  console.log(id)
  console.log(nome)
  return this.http.put<Designation>(`http://54.162.158.231:8080/api/v1/activity-designation/${id}`,body).pipe(
    map(
      (res: Designation) => {
        console.log(res)
      },
    )
  )
}

}
