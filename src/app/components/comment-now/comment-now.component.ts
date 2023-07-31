import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comment-now',
  templateUrl: './comment-now.component.html',
  styleUrls: ['./comment-now.component.css']
})
export class CommentNowComponent {
  query = '';

  @Input()
  post: Post;

  @Output()
  submit = new EventEmitter<Comment>();

  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) {

  }
  
  get emptyQuery() : boolean {
    return (this.query.length == 0) ? true : false;
  }
  
  onPublishClick() {
    if (!this.emptyQuery) this.publish();
  }

  publish() {
    let comment = {
      author: this.authService.getUserLoggedIn()._id,
      post: this.post._id,
      content: this.query
    };
    this.commentService.create(comment).subscribe({
      next: (data) => {
        this.query = '';
        this.submit.emit(data);
      },
      error: (err) => {

      }
    });
  }
}
