import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import { Post } from 'src/app/models/post.model';
import { DialogComponent } from '../dialog/dialog.component';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { LikeService } from 'src/app/services/like.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  liked: boolean;

  @Input()
  post: Post;

  @Output()
  delete: EventEmitter<Post> = new EventEmitter<Post>();

  @Output()
  edit: EventEmitter<Post> = new EventEmitter<Post>();

  constructor(
    private _dialog: MatDialog,
    private _postService: PostService,
    private _authService: AuthService,
    private _likeService: LikeService
  ) {
  }

  ngOnInit(): void {
    this.post.created_at = moment(this.post.created_at).locale('es').fromNow();
    this.loadLike();
  }

  get isLoggedInUser(): boolean {
    return this._authService.verifyCurrentUser(this.post.author._id);
  }

  loadLike() {
    let loggedInUserId = this._authService.getUserLoggedIn()._id;
    let postId = this.post._id;

    this._likeService.isLiked({post: postId, user: loggedInUserId}).subscribe({
      next: (data) => {
        if (data) {
          this.liked = true;
        } else {
          this.liked = false;
        }
      }
    });
  }
  
  onLikeClick() {
    this.submitLike(true);
  }
  
  onDislikeClick() {
    this.submitLike(false);
  }

  submitLike(like: boolean) {
    let loggedInUserId = this._authService.getUserLoggedIn()._id;
    let postId = this.post._id;

    if (like) {

      this._likeService.like({post: postId, user: loggedInUserId}).subscribe({
        next: (data) => {
          if (data) {
            this.liked = true;
          } else {
            this.liked = false;
          }
        }
      });
    } else {
      
      this._likeService.dislike({post: postId, user: loggedInUserId}).subscribe({
        next: (data) => {
          if (data) {
            this.liked = false;
          } else {
            this.liked = true;
          }
        }
      });

    }

  }

  onEditClick() {
    this._dialog.open(DialogComponent, {
      disableClose: true,
      width: '300px',
      data: this.post
    }).afterClosed().subscribe(result => {
      console.log('Post component',result);
      if (result = 'editado' || result == 'creado') {
        this.edit.emit(this.post);
      }
    });
  }

  onDeleteClick() {
    this._postService.delete(this.post._id).subscribe({
      next: (data) => {
        this.delete.emit(this.post);
      }
    })
  }
}
