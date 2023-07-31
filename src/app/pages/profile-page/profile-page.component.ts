import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Follow } from 'src/app/models/follow.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FollowService } from 'src/app/services/follow.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  
  userProfile: User;
  userLoggedIn: any;
  follow: Follow;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _authService: AuthService,
    private _followService: FollowService
  ) {}

  getUserById(id: string) {
    this._userService.getByID(id).subscribe({
      next: data => {
        this.userProfile = data;
        this.showFollowing();
      }
    })
  }

  ngOnInit(): void {
    let id = this._activatedRoute.snapshot.paramMap.get('id');
    this.userLoggedIn = this._authService.getUserLoggedIn();
    this.getUserById(id);
    
  }

  get isLoggedInUser(): boolean {
    return this._authService.verifyCurrentUser(this.userProfile._id);
  }

  onFollowClick() {
    this._followService.follow({
      follower: this.userLoggedIn._id,
      following: this.userProfile._id
    }).subscribe({
      next: data => {
        this.showFollowing();
      }
    });
  }
  
  onUnfollowClick() {
    this._followService.unfollow({
      follower: this.userLoggedIn._id,
      following: this.userProfile._id
    }).subscribe({
      next: data => {
        this.showFollowing();
      }
    });
  }

  showFollowing() {
    this._followService.isFollowing(this.userLoggedIn._id, this.userProfile._id).subscribe({
      next: data => {
        this.follow = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }
  
}
