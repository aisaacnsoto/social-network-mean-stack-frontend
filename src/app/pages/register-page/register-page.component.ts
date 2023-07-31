import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _user: UserService,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.formGroup = this._fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmitClick() {
    if (this.formGroup.valid) this.register();
  }

  register() {
    this._user.create(this.formGroup.value).subscribe({
      next: (data) => {
        this._authService.login(this.formGroup.value).subscribe({
          next: (login) => {
            if (login.status && login.status == 'success') {
              this._router.navigateByUrl('/');
            }
          },
          error: (err) => {
            console.log(err);
          }
        });
        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  
}
