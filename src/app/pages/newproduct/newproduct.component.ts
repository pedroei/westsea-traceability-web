import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.scss']
})
export class NewproductComponent implements OnInit {
  @Input() error: string | null;
  form: FormGroup;

  constructor(private router: Router,private formBuilder: FormBuilder,private productService:ProductService, public dialogRef: MatDialogRef<NewproductComponent>) {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required])
    });
    this.error = null;
   }

  ngOnInit() {

  }

  submit(){
    if (this.form.valid) {
      this.productService.create(
        this.form.controls.nome.value
      ).subscribe(
        (success) => {this.dialogRef.close()},
				(err) =>{
          console.log(err)
          this.error = 'ERRO'
        }
        );
    }
  }

}
