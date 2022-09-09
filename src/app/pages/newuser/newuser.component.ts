import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {UserService} from 'src/app/Services/user.service';
import {Role} from "../../enum/role";

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.scss']
})
export class NewuserComponent implements OnInit {
  @Input() error: string | null;
  form: FormGroup;
  role = Role;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService, public dialogRef: MatDialogRef<NewuserComponent>) {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl(this.role.CLIENT, [Validators.required])
    });
    this.error = null;
  }

  ngOnInit() {

  }

  submit() {
    if (!this.form.valid) {
      return;
    }
    this.userService.create(
      this.form.controls.nome.value,
      this.form.controls.username.value,
      this.form.controls.password.value,
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
