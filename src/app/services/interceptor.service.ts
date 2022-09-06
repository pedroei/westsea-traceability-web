import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import {UserService} from './user.service'



@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {


  constructor(private userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.userService.getUserToken;
    if (token != "") {
      const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
      return next.handle(tokenizedReq);
    }
    return next.handle(req);
  }

}
