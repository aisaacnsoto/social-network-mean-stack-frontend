import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-posts-section-profile',
  templateUrl: './posts-section-profile.component.html',
  styleUrls: ['./posts-section-profile.component.css']
})
export class PostsSectionProfileComponent {
  user: User;
  posts: Post[] = [];

  constructor(
    private _postService: PostService,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadUser();
    this.getPosts();
  }

  loadUser() {
    let id = this._activatedRoute.snapshot.paramMap.get('id')
    this._userService.getByID(id).subscribe({
      next: (data) => {
        this.user = data;
      }
    })
  }

  getPosts() {
    let autor = this._activatedRoute.snapshot.paramMap.get('id')
    this._postService.getByAutor(autor).subscribe({
      next: (data) => {
        this.posts = data;
      }
    })
  }

  onPublishNowClick(post: Post) {
    this.getPosts();
  }

  onDeleteClick(post: Post) {
    this.getPosts();
  }

  onEditClick(post: Post) {
    this.getPosts();
  }
}
