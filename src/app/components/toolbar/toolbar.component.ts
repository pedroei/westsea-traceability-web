import {Component, OnInit, ViewChild} from '@angular/core';
import {MediaQueryService} from "../../Services/media-query.service";
import {MatSidenav} from "@angular/material/sidenav";
import {Router} from "@angular/router";
import {UserService} from "../../Services/user.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;
  show = true;
  constructor( public mediaQueryService: MediaQueryService,
               private readonly router: Router,
               private readonly userService: UserService) { }

  ngOnInit(): void {
    this.show = this.userService.isClient();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
