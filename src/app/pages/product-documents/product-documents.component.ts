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
  showNav = true;
  produto!: Produto;
  documents: any[] = [];

  constructor(
    private router: Router,
    private traceabilityService: TraceabilityService,
    private helper: JwtHelperService,
    private userService: UserService
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
    const token = this.helper.decodeToken(this.userService.getUserToken);
    if (
      token.roles.includes('ROLE_CLIENT') &&
      !token.roles.includes('ROLE_EMPLOYEE') &&
      !token.roles.includes('ROLE_ADMIN')
    ) {
      this.showNav = false;
    }
    this.load(this.router.url.split('/')[2]);
  }

  load(referenceNumber: string) {
    this.traceabilityService
      .getTrace(referenceNumber)
      .pipe(
        tap((data: Produto) => {
          this.produto = data;
          this.loading = false;
        }),
        tap((data: Produto) => {
          data.documentKeys.forEach((docKey) =>
            this.getDocument(data.ID, docKey)
          );
        })
      )
      .subscribe();
  }

  sair() {
    localStorage.clear();
    this.router.navigate(['/login']);
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
