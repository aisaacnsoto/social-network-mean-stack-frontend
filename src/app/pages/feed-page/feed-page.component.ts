import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.css']
})
export class FeedPageComponent implements OnInit {

  currenUser: any;

  posts: Post[] = [];

  constructor(
    private _postService: PostService,
    private _authService: AuthService
  ) {
    this.currenUser = this._authService.getUserLoggedIn();
  }

  onPublishSubmit(post: Post) {
    this.getPosts();
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this._postService.getAll().subscribe({
      next: (data) => {
        this.posts = data;
      }
    })
  }

  onDeleteClick(post: Post) {
    this.getPosts();
  }

  onEditClick(post: Post) {
    this.getPosts();
  }
}
