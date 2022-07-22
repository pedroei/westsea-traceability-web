import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/types/user';
import { EdituserComponent } from '../edituser/edituser.component';
import { NewuserComponent } from '../newuser/newuser.component';

@Component({
  selector: 'app-usercrud',
  templateUrl: './usercrud.component.html',
  styleUrls: ['./usercrud.component.scss']
})
export class UsercrudComponent implements OnInit {

  users!: User[];

  show=true


  constructor(private router:Router,public dialog: MatDialog, private userService:UserService,private helper: JwtHelperService) { }

  ngOnInit() {
    const token = this.helper.decodeToken(this.userService.getUserToken)
    if(token.roles.includes("ROLE_EMPLOYEE") && !token.roles.includes("ROLE_ADMIN"))
      this.show=false
    this.updateList()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewuserComponent);
    dialogRef.afterClosed().subscribe(
      data=>this.updateList()
    );
  }

  edit(user:User):void{
    const dialogRef = this.dialog.open(EdituserComponent, {
       data: {
         dataKey: user
       }
     });

    dialogRef.afterClosed().subscribe(
      data=>this.updateList()
     );
  }

  updateList(){
    this.userService.getAll().subscribe(
      (data) => {
        this.users = data
      });
  }

  sair(){
    console.log("sair")
    localStorage.clear()
    this.router.navigate(['/login']);
  }

}
