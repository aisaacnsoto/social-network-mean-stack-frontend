import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  formGroup: FormGroup;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formGroup = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLoginClick() {
    if (this.formGroup.valid) this.login();
  }

  login() {
    this._authService.login(this.formGroup.value).subscribe({
      next: (login) => {
        if (login.token) {
          const redirectUrl = this._authService.getRedirectUrl();
          this._router.navigateByUrl(redirectUrl);
        } else {
          alert('Email o contraseña incorrectas.');
          this.formGroup.setValue({email:'', password:''});
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
