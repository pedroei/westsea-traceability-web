import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/Services/activity.service';


@Component({
  selector: 'app-newActivity',
  templateUrl: './newActivity.component.html',
  styleUrls: ['./newActivity.component.scss']
})
export class NewActivityComponent implements OnInit {
  @Input() error: string | null;
  form: FormGroup;

  constructor(private router: Router,private formBuilder: FormBuilder,private activityService:ActivityService, public dialogRef: MatDialogRef<NewActivityComponent>) {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required])
    });
    this.error = null;
   }

  ngOnInit() {

  }

  submit(){
    if (this.form.valid) {
      this.activityService.create(
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
