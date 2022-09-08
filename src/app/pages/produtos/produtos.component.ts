import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {TraceabilityService} from 'src/app/Services/traceability.service';
import {Produto} from 'src/app/types/produto';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProdutosComponent implements OnInit {
  products:Produto[] = [];
  displayedColumns: string[] = ['referenceNumber','designation','productType','initialQuantity','availableQuantity', 'documents', 'traceability']
  loading = true


  constructor(private router:Router,
              private traceabilityService:TraceabilityService) {
   }

  ngOnInit() {
    this.updateList()
  }

  goToProductTraceability(referenceNumber:string){
    this.router.navigate([`/produtos/${referenceNumber}/traceability`])
  }

  goToProductDocuments(referenceNumber:string){
    this.router.navigate([`/produtos/${referenceNumber}/documents`])
  }

  updateList(){
    this.traceabilityService.getProducts().pipe().subscribe(
      (data) => {
        console.log(data);
        this.products = data;
        this.loading = false
      },
      () => {
        this.loading = false;
      });
  }

}
