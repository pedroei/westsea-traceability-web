import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProductService } from 'src/app/Services/product.service';
import { UserService } from 'src/app/Services/user.service';
import { Designation } from 'src/app/types/designation';
import { EditproductComponent } from '../editproduct/editproduct.component';
import { NewproductComponent } from '../newproduct/newproduct.component';
import {Observable, switchAll, switchMap, tap} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-productcrud',
  templateUrl: './productcrud.component.html',
  styleUrls: ['./productcrud.component.scss']
})
export class ProductcrudComponent implements OnInit {
  products!: Designation[];
  displayedColumns: string[] = ['designation', 'edit', 'remove'];
  show=true

  constructor(private router:Router,
              public dialog: MatDialog,
              private productService:ProductService,
              private userService:UserService,
              private helper: JwtHelperService,
              private readonly translate: TranslateService) { }

  ngOnInit() {
    const token = this.helper.decodeToken(this.userService.getUserToken)
    if(token.roles.includes("ROLE_EMPLOYEE") && !token.roles.includes("ROLE_ADMIN"))
      this.show=false
    this.updateList().subscribe()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewproductComponent);
    dialogRef.afterClosed().pipe(
      switchMap(() => this.updateList())
    ).subscribe();
  }

  delete(product: Designation):void{
    if(confirm(this.translate.instant("PRODUCT_DESIGNATION.REMOVE_DESIGNATION_QUESTION")+product.designation+"?")) {
      this.productService.delete(product.id).pipe(
        switchMap(() => this.updateList())
      ).subscribe()
    }
  }

  edit(id:string):void{
    const dialogRef = this.dialog.open(EditproductComponent, {
      data: {
        dataKey: id
      }
    });

    dialogRef.afterClosed().pipe(
      switchMap(()=> this.updateList()),
    ).subscribe();
  }

  updateList(): Observable<Designation[]>{
    return this.productService.getAll().pipe(
      tap((data) => this.products = data));
  }
}


