import { Component, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-publish-now',
  templateUrl: './publish-now.component.html',
  styleUrls: ['./publish-now.component.css']
})
export class PublishNowComponent {
  query = '';

  @Output()
  submit = new EventEmitter<Post>();

  constructor(
    private postService: PostService,
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
    let post = {
      author: this.authService.getUserLoggedIn()._id,
      content: this.query
    };
    this.postService.create(post).subscribe({
      next: (data) => {
        this.query = '';
        this.submit.emit(data);
      },
      error: (err) => {

      }
    });
  }
}
