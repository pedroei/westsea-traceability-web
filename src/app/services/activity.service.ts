import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Designation } from '../types/designation';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  url = environment.apiUrl + '/v1/activity-designation';

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  constructor(private http: HttpClient) {}

  create(nome: string) {
    let body = {
      designation: nome,
    };
    return this.http.post<Designation>(this.url, body).pipe(
      map((res: Designation) => {
        console.log(res);
      })
    );
  }

  getAll(): Observable<Designation[]> {
    return this.http.get<Designation[]>(this.url, this.options);
  }

  get(id: string): Observable<Designation> {
    return this.http.get<Designation>(this.url, this.options);
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  edit(id: string, nome: string) {
    let body = {
      designation: nome,
    };
    console.log(id);
    console.log(nome);
    return this.http.put<Designation>(`${this.url}/${id}`, body).pipe(
      map((res: Designation) => {
        console.log(res);
      })
    );
  }
}
