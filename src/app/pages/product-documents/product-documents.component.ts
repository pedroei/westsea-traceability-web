import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs';
import { TraceabilityService } from 'src/app/Services/traceability.service';
import { UserService } from 'src/app/Services/user.service';
import { DocumentKey } from 'src/app/types/documentKey';
import { Produto } from 'src/app/types/produto';

@Component({
  selector: 'app-product-documents',
  templateUrl: './product-documents.component.html',
  styleUrls: ['./product-documents.component.scss'],
})
export class ProductDocumentsComponent implements OnInit {
  loading = true;
  product!: Produto;
  documents: any[] = [];

  constructor(
    private router: Router,
    private traceabilityService: TraceabilityService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    this.load(this.router.url.split('/')[2]);
  }

  load(referenceNumber: string) {
    this.traceabilityService
      .getTrace(referenceNumber)
      .pipe(
        tap((data: Produto) => {
          console.log(data);
          this.product = data;
          this.loading = false;
        }),
        tap((data: Produto) => {
          data.documentKeys?.forEach((docKey) =>
            this.getDocument(data.ID, docKey)
          );
        })
      )
      .subscribe();
  }

  getDocument(productId: string, docKey: DocumentKey) {
    this.traceabilityService
      .getPDF(productId, docKey.documentKey)
      .subscribe((response) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        this.documents.push(fileURL);
      });
  }
}
