import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TraceabilityService } from 'src/app/Services/traceability.service';
import { UserService } from 'src/app/Services/user.service';
import { Produto } from 'src/app/types/produto';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  showNav=true

  @ViewChild(MatTable)
  table!: MatTable<Produto>;

  displayedColumns: string[] = ['referenceNumber','designation','productType','initialQuantity','availableQuantity']

  loading = true

  produtos!:Produto[]
  dataSource :MatTableDataSource<any>

  constructor(private router:Router,private traceabilityService:TraceabilityService,private helper: JwtHelperService, private userService:UserService) {
    this.produtos=[]
    this.dataSource = new MatTableDataSource(this.produtos)
   }

  ngOnInit() {
    const token = this.helper.decodeToken(this.userService.getUserToken)
    if(token.roles.includes("ROLE_CLIENT") && !token.roles.includes("ROLE_EMPLOYEE") && !token.roles.includes("ROLE_ADMIN"))
      this.showNav=false
  }

  ngAfterViewInit() {
    this.updateList()
    this.dataSource = new MatTableDataSource(this.produtos)
  }

  check(referenceNumber:string){
    this.router.navigate([`/produtos/${referenceNumber}`])
  }

  updateList(){
    this.traceabilityService.getProducts().subscribe(
      (data) => {
        this.produtos = data
        this.loading = false
      });
  }

  sair(){
    console.log("sair")
    localStorage.clear()
    this.router.navigate(['/login']);
  }

}
