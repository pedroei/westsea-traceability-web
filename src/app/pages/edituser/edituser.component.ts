import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {UserService} from 'src/app/Services/user.service';
import {Role} from "../../enum/role";

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent {
  @Input() error: string | null = null;
  form: FormGroup;
  role = Role;
  roles: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private formBuilder: FormBuilder, private userService: UserService, public dialogRef: MatDialogRef<EdituserComponent>) {
    this.form = new FormGroup({
      nome: new FormControl(data.dataKey.name, Validators.required),
      role: new FormControl(data.dataKey.roles[0], Validators.required)
    });
  }

  submit() {
    this.userService.edit(
      this.data.dataKey.id,
      this.form.controls.nome.value != "" ? this.form.controls.nome.value : this.data.dataKey.name,
      [this.form.controls.role.value]
    ).subscribe(
      (success) => {
        this.dialogRef.close()
      },
      (err) => {
        console.log(err)
        this.error = 'ERRO'
      }
    );
  }

}
