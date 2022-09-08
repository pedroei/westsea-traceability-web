import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainpageGuard } from './guards/mainpage.guard';
import { LoginGuard } from './guards/login.guard';
import { ActivitycrudComponent } from './pages/activitycrud/activitycrud.component';
import { ProductcrudComponent } from './pages/productcrud/productcrud.component';
import { UsercrudComponent } from './pages/usercrud/usercrud.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { ProductTraceabilityComponent } from './pages/productTraceability/productTraceability.component';
import { ProductDocumentsComponent } from './pages/product-documents/product-documents.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'atividadescrud',
    component: ActivitycrudComponent,
    canActivate: [MainpageGuard],
  },
  {
    path: 'produtoscrud',
    component: ProductcrudComponent,
    canActivate: [MainpageGuard],
  },
  {
    path: 'utilizadores',
    component: UsercrudComponent,
    canActivate: [MainpageGuard],
  },
  {
    path: 'produtos',
    component: ProdutosComponent,
    canActivate: [MainpageGuard],
  },
  {
    path: 'produtos/:id/traceability',
    component: ProductTraceabilityComponent,
  },
  {
    path: 'produtos/:id/documents',
    component: ProductDocumentsComponent,
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
