import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../types/user';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl + '/v1/user';
  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  constructor(private http: HttpClient, private helper: JwtHelperService) {}

  public get getUserToken(): string {
    const token = localStorage.getItem('access_token');
    if (token) {
      return token;
    }
    return '';
  }

  public get isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    if (token) {
      return !this.helper.isTokenExpired(token as string);
    } else {
      return false;
    }
  }

  create(nome: string, username: string, password: string, roles: string[]) {
    let body = {
      name: nome,
      username: username,
      password: password,
      roles: roles,
    };
    return this.http.post<User>(this.url, body)
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url, this.options);
  }

  edit(id: string, nome: string, roles: string[]) {
    let body = {
      name: nome,
      roles: roles,
    };
    return this.http.put<User>(`${this.url}/${id}`, body)
  }


  isEmployee(): boolean{
    const token = this.helper.decodeToken(this.getUserToken)
    return !(token.roles.includes("ROLE_EMPLOYEE") && !token.roles.includes("ROLE_ADMIN"));
  }

  isClient(): boolean{
    const token = this.helper.decodeToken(this.getUserToken)
    return !(token.roles.includes("ROLE_CLIENT") && !token.roles.includes("ROLE_EMPLOYEE") && !token.roles.includes("ROLE_ADMIN"));
  }
}
