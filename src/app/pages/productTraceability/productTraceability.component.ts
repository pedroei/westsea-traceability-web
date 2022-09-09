import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TraceabilityService } from 'src/app/Services/traceability.service';
import { Produto } from 'src/app/types/produto';
import { Edge, Node } from '@swimlane/ngx-graph';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-productTraceability',
  templateUrl: './productTraceability.component.html',
  styleUrls: ['./productTraceability.component.scss'],
})
export class ProductTraceabilityComponent implements OnInit {
  loading = true;
  traceability = false;

  product!: Produto;

  links: Edge[] = [];

  nodes: Node[] = [];

  public layoutSettings = {
    orientation: 'TB',
  };

  constructor(
    private router: Router,
    private traceabilityService: TraceabilityService,
    private readonly translate: TranslateService
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
    this.traceabilityService.getTrace(referenceNumber).subscribe((data) => {
      this.product = data;
      if (this.product.activity) {
        this.createGraph();
        this.traceability = true;
      }
      console.log(this.links);
      this.loading = false;
    });
  }

  createGraph() {
    const id = this.makeid(16);
    this.nodes.push({
      id: id,
      label: [
        this.translate.instant('PRODUCTS.AVAILABLE_QUANTITY'),
        this.product.availableQuantity.toString(),
      ].join(' : '),
      data: {
        reference: this.product.referenceNumber,
        designation: this.product.designation,
      },
    });
    if (this.product.activity) {
      for (let i of this.product.activity.inputProductLots) {
        this.createNode(id, i);
      }
    }
  }

  createNode(parent: string, product: Produto) {
    const id = this.makeid(16);
    console.log(product);
    this.nodes.push({
      id: id,
      label: [
        this.translate.instant('PRODUCTS.QUANTITY_USED'),
        product.usedQuantityAsInput.toString(),
      ].join(' : '),
      data: {
        reference: product.referenceNumber,
        designation: product.designation,
      },
    });

    this.links.push({
      id: this.makeid(16),
      source: parent,
      target: id,
    });
    if (product.activity) {
      for (let i of product.activity.inputProductLots) {
        this.createNode(id, i);
      }
    }
  }

  makeid(length: number) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  goTo(id: string) {
    this.router.navigate([`/produtos/${id}/traceability`]);
  }
}
