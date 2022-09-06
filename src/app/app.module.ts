import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { JwtModule } from '@auth0/angular-jwt';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MainpageGuard } from './guards/mainpage.guard';
import { LoginGuard } from './guards/login.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ActivitycrudComponent } from './pages/activitycrud/activitycrud.component';
import { NewActivityComponent } from './pages/newActivity/newActivity.component';
import { InterceptorService } from './Services/interceptor.service';
import { EditActivityComponent } from './pages/edit-activity/edit-activity.component';
import { ProductcrudComponent } from './pages/productcrud/productcrud.component';
import { NewproductComponent } from './pages/newproduct/newproduct.component';
import { EditproductComponent } from './pages/editproduct/editproduct.component';
import { UsercrudComponent } from './pages/usercrud/usercrud.component';
import { NewuserComponent } from './pages/newuser/newuser.component';
import { EdituserComponent } from './pages/edituser/edituser.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { ProductTraceabilityComponent } from './pages/productTraceability/productTraceability.component';
import { ProductDocumentsComponent } from './pages/product-documents/product-documents.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatRippleModule} from "@angular/material/core";
import {ToolbarModule} from "./components/toolbar/toolbar.module";

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ActivitycrudComponent,
    NewActivityComponent,
    EditActivityComponent,
    ProductcrudComponent,
    NewproductComponent,
    EditproductComponent,
    UsercrudComponent,
    NewuserComponent,
    EdituserComponent,
    ProdutosComponent,
    ProductTraceabilityComponent,
    ProductDocumentsComponent,
  ],
  imports: [
    //BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    NgxGraphModule,
    MatTooltipModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'),
        allowedDomains: ['localhost:4200/atividades', 'localhost:4200/login'],
        disallowedRoutes: [],
      },
    }),
    PdfViewerModule,
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatToolbarModule,
    MatRippleModule,
    ToolbarModule
  ],
  providers: [
    LoginGuard,
    MainpageGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
