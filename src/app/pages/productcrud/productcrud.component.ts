import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProductService } from 'src/app/Services/product.service';
import { UserService } from 'src/app/Services/user.service';
import { Designation } from 'src/app/types/designation';
import { EditproductComponent } from '../editproduct/editproduct.component';
import { NewproductComponent } from '../newproduct/newproduct.component';

@Component({
  selector: 'app-productcrud',
  templateUrl: './productcrud.component.html',
  styleUrls: ['./productcrud.component.scss']
})
export class ProductcrudComponent implements OnInit {
  produtos!: Designation[];

  show=true

  constructor(private router:Router,public dialog: MatDialog, private productService:ProductService, private userService:UserService,private helper: JwtHelperService) { }

  ngOnInit() {
    const token = this.helper.decodeToken(this.userService.getUserToken)
    if(token.roles.includes("ROLE_EMPLOYEE") && !token.roles.includes("ROLE_ADMIN"))
      this.show=false
    this.updateList()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewproductComponent);
    dialogRef.afterClosed().subscribe(
      data=>this.updateList()
    );
  }

  delete(id:string,designation:string):void{
    if(confirm("Tem a certeza que quer apagar a designação "+designation+"?")) {
      this.productService.delete(id).subscribe(
        (data) => {
          console.log(data)
        })
        this.updateList()
    }
  }

  edit(id:string):void{
    const dialogRef = this.dialog.open(EditproductComponent, {
      data: {
        dataKey: id
      }
    });

    dialogRef.afterClosed().subscribe(
      data=>this.updateList()
    );
  }

  updateList(){
    this.productService.getAll().subscribe(
      (data) => {
        this.produtos = data
      });
  }

  sair(){
    console.log("sair")
    localStorage.clear()
    this.router.navigate(['/login']);
  }

}
