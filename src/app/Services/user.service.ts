import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../types/user';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  options = {
    headers: new HttpHeaders().set('Content-Type','application/json')
  }

  constructor(private http: HttpClient,private helper: JwtHelperService) { }

  public get getUserToken(): string {
		const token = localStorage.getItem('access_token');
		if (token) { return token; }
    return "";
	}

  public get isLoggedIn(): boolean {
		const token = localStorage.getItem('access_token');
		if (token) { return !this.helper.isTokenExpired(token as string); }
		else { return false; }
	}

  create(nome: string,username:string,password:string,roles:string[]){
    let body = {
      name: nome,
      username: username,
      password: password,
      roles:roles
    }
    return this.http.post<User>('http://54.162.158.231:8080/api/v1/user',body).pipe(
      map(
        (res: User) => {
          console.log(res)
        },
      )
    )
  }

  getAll(): Observable<User[]>{
    return this.http.get<User[]>('http://54.162.158.231:8080/api/v1/user', this.options);
  }

  edit(id: string,nome: string,roles:string[]){
    let body = {
      name: nome,
      roles:roles
    }
    return this.http.put<User>(`http://54.162.158.231:8080/api/v1/user/${id}`,body).pipe(
      map(
        (res: User) => {
          console.log(res)
        },
      )
    )
  }


}
