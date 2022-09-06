import {Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "./Services/user.service";
import {MatSidenav} from "@angular/material/sidenav";
import {MediaQueryService} from "./Services/media-query.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;
  constructor(private translate: TranslateService,
              private readonly userService: UserService,
              private readonly router: Router,
              public mediaQueryService: MediaQueryService) {
    translate.setDefaultLang('pt');
    translate.use('pt');
  }

  isLogin(): boolean {
    return this.userService.isLoggedIn;
  }

  isClient(): boolean{
    if(this.isLogin()){
      return this.userService.isClient();
    }
   return false;
  }

  logout(){
      this.sidenav.close();
      localStorage.clear();
      this.router.navigate(['/login']);
  }
}
