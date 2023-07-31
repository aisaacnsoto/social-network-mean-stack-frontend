import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  query = '';

  currenUser: any;

  constructor(private _router: Router, private _authService: AuthService) {
    this.currenUser = this._authService.getUserLoggedIn();
  }

  onSearchClick() {
    this._router.navigateByUrl('/search/'+this.query);
  }

  onLogoutClick() {
    this._authService.logout();
    
    this._router.navigateByUrl('/login');
  }
}
