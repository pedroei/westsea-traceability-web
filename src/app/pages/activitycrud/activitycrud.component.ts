import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ActivityService } from 'src/app/Services/activity.service';
import { UserService } from 'src/app/Services/user.service';
import { Designation } from 'src/app/types/designation';
import { EditActivityComponent } from '../edit-activity/edit-activity.component';
import { NewActivityComponent } from '../newActivity/newActivity.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activitycrud',
  templateUrl: './activitycrud.component.html',
  styleUrls: ['./activitycrud.component.scss']
})
export class ActivitycrudComponent implements OnInit {

  atividades!: Designation[];

  show=true
  showNav=true


  constructor(private router:Router,public dialog: MatDialog, private activityService:ActivityService, private userService:UserService,private helper: JwtHelperService) { }

  ngOnInit() {
    const token = this.helper.decodeToken(this.userService.getUserToken)
    if(token.roles.includes("ROLE_EMPLOYEE") && !token.roles.includes("ROLE_ADMIN"))
      this.show=false
    this.updateList()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewActivityComponent);
    dialogRef.afterClosed().subscribe(
      data=>this.updateList()
    );
  }

  delete(id:string,designation:string):void{
    if(confirm("Tem a certeza que quer apagar a designação "+designation+"?")) {
      this.activityService.delete(id).subscribe(
        (data) => {
          console.log(data)
          this.updateList()
        })
    }
  }

  edit(id:string):void{
    const dialogRef = this.dialog.open(EditActivityComponent, {
      data: {
        dataKey: id
      }
    });

    dialogRef.afterClosed().subscribe(
      data=>this.updateList()
    );
  }

  updateList(){
    this.activityService.getAll().subscribe(
      (data) => {
        this.atividades = data
      });
  }

  sair(){
    console.log("sair")
    localStorage.clear()
    this.router.navigate(['/login']);
  }

}
