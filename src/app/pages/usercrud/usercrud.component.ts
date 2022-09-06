import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

import {UserService} from 'src/app/Services/user.service';
import {User} from 'src/app/types/user';
import {EdituserComponent} from '../edituser/edituser.component';
import {NewuserComponent} from '../newuser/newuser.component';
import {Observable, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-usercrud',
  templateUrl: './usercrud.component.html',
  styleUrls: ['./usercrud.component.scss']
})
export class UsercrudComponent implements OnInit {

  users!: User[];
  displayedColumns: string[] = ['name', 'edit'];
  show = true


  constructor(private router: Router, public dialog: MatDialog, private userService: UserService, private helper: JwtHelperService) {
  }

  ngOnInit() {
    const token = this.helper.decodeToken(this.userService.getUserToken)
    if (token.roles.includes("ROLE_EMPLOYEE") && !token.roles.includes("ROLE_ADMIN"))
      this.show = false;
    this.updateList().subscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewuserComponent);
    dialogRef.afterClosed().pipe(
      switchMap(() => this.updateList())
    ).subscribe();
  }

  edit(user: User): void {
    const dialogRef = this.dialog.open(EdituserComponent, {
      data: {
        dataKey: user
      }
    });

    dialogRef.afterClosed().pipe(
      switchMap(() => this.updateList())
    ).subscribe();
  }

  updateList(): Observable<User[]> {
    return this.userService.getAll().pipe(
      tap(data => this.users = data)
    )
  }
}
