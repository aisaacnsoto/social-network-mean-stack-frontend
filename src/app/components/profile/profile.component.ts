import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Follow } from 'src/app/models/follow.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @Input()
  follow: Follow;

  @Input()
  follower: boolean;

  @Input()
  following: boolean;
}
