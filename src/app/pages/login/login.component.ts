import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() error: string | null;
  form: FormGroup;

  constructor( private formBuilder: FormBuilder,private authService:AuthService,private router: Router) {
    this.form = new FormGroup({
			            email: new FormControl('', [Validators.required]),
			            password: new FormControl('', Validators.required),
		            });
    this.error = null;
  }

  ngOnInit() {
  }

  submit(){
    if (this.form.valid) {
			this.authService.login(
				this.form.controls.email.value,
				this.form.controls.password.value,
			).subscribe(
				(success) => this.router.navigate(['/home']),
				(err) =>{
          console.log(err)
          this.error = 'Nome e/ou Password incorretos'
        }
			);
		}
  }
}
