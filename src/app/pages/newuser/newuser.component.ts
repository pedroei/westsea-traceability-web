import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.scss']
})
export class NewuserComponent implements OnInit {
  @Input() error: string | null;
  form: FormGroup;
  isEmployee = false
  isAdmin = false
  isClient = false

  roles:string[]

  constructor(private router: Router,private formBuilder: FormBuilder,private userService:UserService, public dialogRef: MatDialogRef<NewuserComponent>) {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      admin : new FormControl(''),
      employee : new FormControl(''),
      client : new FormControl('')
    });
    this.error = null;
    this.roles = []
   }

  ngOnInit() {

  }

  onAdminChange(){
    if(this.isAdmin==false){
      this.roles.push("ROLE_ADMIN")
    }else{
      const index = this.roles.indexOf("ROLE_ADMIN", 0);
      if (index > -1) {
          this.roles.splice(index, 1);
      }
    }
    console.log(this.roles)
  }

  onEmployeeChange(){
    if(this.isEmployee==false){
      this.roles.push("ROLE_EMPLOYEE")
    }else{
      const index = this.roles.indexOf("ROLE_EMPLOYEE", 0);
      if (index > -1) {
          this.roles.splice(index, 1);
      }
    }
    console.log(this.roles)
  }

  onClientChange(){
    if(this.isClient==false){
      this.roles.push("ROLE_CLIENT")
    }else{
      const index = this.roles.indexOf("ROLE_CLIENT", 0);
      if (index > -1) {
          this.roles.splice(index, 1);
      }
    }
    console.log(this.roles)
  }

  submit(){
    if (this.form.valid && this.roles.length!=0) {
      this.userService.create(
        this.form.controls.nome.value,
        this.form.controls.username.value,
        this.form.controls.password.value,
        this.roles
      ).subscribe(
        (success) => {this.dialogRef.close()},
				(err) =>{
          console.log(err)
          this.error = 'ERRO'
        }
        );
    }else{
      this.error = 'Selecione uma função'
    }
  }

}
