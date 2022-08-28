import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TraceabilityService } from 'src/app/Services/traceability.service';
import { Produto } from 'src/app/types/produto';
import { Edge, Node, ClusterNode, Layout } from '@swimlane/ngx-graph';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/Services/user.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-productTraceability',
  templateUrl: './productTraceability.component.html',
  styleUrls: ['./productTraceability.component.scss'],
})
export class ProductTraceabilityComponent implements OnInit {
  loading = true;
  traceability = false;

  showNav = true;

  produto!: Produto;

  nodeCheck: string[] = [];

  links: Edge[] = [];

  nodes: Node[] = [];

  public layoutSettings = {
    orientation: 'TB',
  };

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
    this.traceabilityService.getTrace(referenceNumber).subscribe((data) => {
      this.produto = data;
      console.log('teste');
      console.log(this.produto);
      if (this.produto.activity) {
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
        'Quantidade Disponivel',
        this.produto.availableQuantity.toString(),
      ].join(' : '),
      data: {
        reference: this.produto.referenceNumber,
        designation: this.produto.designation,
      },
    });
    console.log('NODE ADDED');
    if (this.produto.activity) {
      for (let i of this.produto.activity.inputProductLots) {
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
        'Quantidade Utilizada',
        product.usedQuantityAsInput.toString(),
      ].join(' : '),
      data: {
        reference: product.referenceNumber,
        designation: product.designation,
      },
    });
    console.log('NODE ADDED');

    this.links.push({
      id: this.makeid(16),
      source: parent,
      target: id,
    });
    console.log('Link ADDED');
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
    this.router.navigate([`/produtos/${id}`]);
  }

  sair() {
    console.log('sair');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
