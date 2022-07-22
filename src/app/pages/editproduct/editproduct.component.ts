import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {
  @Input() error: string | null;
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router: Router,private formBuilder: FormBuilder,private productService:ProductService,public dialogRef: MatDialogRef<EditproductComponent>) {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required])
    });
    this.error = null;
   }

  ngOnInit() {

  }

  submit(){
    if (this.form.valid) {
      this.productService.edit(
        this.data.dataKey,
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
