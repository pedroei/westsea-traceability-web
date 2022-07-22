import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/Services/activity.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.scss']
})
export class EditActivityComponent implements OnInit {
  @Input() error: string | null;
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router: Router,private formBuilder: FormBuilder,private activityService:ActivityService,public dialogRef: MatDialogRef<EditActivityComponent>) {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required])
    });
    this.error = null;
   }

  ngOnInit() {

  }

  submit(){
    if (this.form.valid) {
      this.activityService.edit(
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
