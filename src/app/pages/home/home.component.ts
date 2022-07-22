import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  show=true

  constructor(private router:Router, private userService:UserService,private helper: JwtHelperService) { }

  ngOnInit() {
    const token = this.helper.decodeToken(this.userService.getUserToken)
    if(token.roles.includes("ROLE_CLIENT") && !token.roles.includes("ROLE_EMPLOYEE") && !token.roles.includes("ROLE_ADMIN"))
      this.show=false
  }

  productCrud(){
    this.router.navigate(['/produtoscrud']);
  }

  activityCrud(){
    this.router.navigate(['/atividadescrud']);
  }
  userCrud(){
    this.router.navigate(['/utilizadores']);
  }

  produtos(){
    this.router.navigate(['/produtos']);
  }

  sair(){
    console.log("sair")
    localStorage.clear()
    this.router.navigate(['/login']);
  }

}
