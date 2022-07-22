import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
  @Input() error: string | null;
  form: FormGroup;
  isEmployee = false
  isAdmin = false
  isClient = false

  roles:string[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router: Router,private formBuilder: FormBuilder,private userService:UserService, public dialogRef: MatDialogRef<EdituserComponent>) {
    this.form = new FormGroup({
      nome: new FormControl(''),
      admin : new FormControl(''),
      employee : new FormControl(''),
      client : new FormControl('')
    });
    this.error = null;
    this.roles = data.dataKey.roles
    if(this.roles.indexOf('ROLE_ADMIN') > -1){
      this.isAdmin=true
    }
    if(this.roles.indexOf('ROLE_EMPLOYEE') > -1){
      this.isEmployee=true
    }
    if(this.roles.indexOf('ROLE_CLIENT') > -1){
      this.isClient=true
    }
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
    let username

    if(this.form.controls.nome.value!=""){
      username=this.form.controls.nome.value
    }else{
      username=this.data.dataKey.name
    }

    if(this.roles.length > 0){
      this.userService.edit(
        this.data.dataKey.id,
        username,
        this.roles
        ).subscribe(
          (success) => {this.dialogRef.close()},
         		(err) =>{
               console.log(err)
               this.error = 'ERRO'
             }
             );
    }else{
      this.error = 'O Utilizador tem de ter pelo menos uma função atribuida'
    }
  }

}
