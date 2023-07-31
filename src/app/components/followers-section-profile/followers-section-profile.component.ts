import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Follow } from 'src/app/models/follow.model';
import { User } from 'src/app/models/user.model';
import { FollowService } from 'src/app/services/follow.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-followers-section-profile',
  templateUrl: './followers-section-profile.component.html',
  styleUrls: ['./followers-section-profile.component.css']
})
export class FollowersSectionProfileComponent implements OnInit {
  user: User;
  follows: Follow[];

  constructor(
    private _followService: FollowService,
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.getFollows();
  }

  loadUser() {
    let id = this._route.snapshot.paramMap.get('id');
    this._userService.getByID(id).subscribe({
      next: (data) => {
        this.user = data;
      }
    })
  }
  getFollows() {
    let id = this._route.snapshot.paramMap.get('id');
    this._followService.getFollowers(id).subscribe({
      next: data => {
        this.follows = data;
      }
    })
  }
}
