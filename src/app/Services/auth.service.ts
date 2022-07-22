import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JWT } from '../types/jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

options = {
  headers: new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
}

constructor(private http: HttpClient) { }

login(email: string, password: string) {
  let body = new URLSearchParams();
  body.set('username',email)
  body.set('password',password)
  return this.http.post<JWT>('http://54.162.158.231:8080/api/login', body.toString(),this.options).pipe(
    map(
      (res: JWT) => {
        if (res) {
          localStorage.setItem('access_token', res.access_token);
        }
      },
    )
  );
}

}
