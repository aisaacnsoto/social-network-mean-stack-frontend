import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment.model';
import { Post } from 'src/app/models/post.model';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _postService: PostService,
    private _comment: CommentService,
  ) { }

  ngOnInit(): void {
    this.idPost = this._route.snapshot.paramMap.get('id');

    this.loadPost();
    this.loadComments();
  }

  idPost: string;

  post: Post;

  comments: Comment[];

  loadPost() {
    this._postService.getByID(this.idPost).subscribe({
      next: data => {
        console.log('post page',data);
        
        this.post = data;
      }
    });
  }

  loadComments() {
    this._comment.getByPost(this.idPost).subscribe({
      next: data => {
        this.comments = data;
      }
    });
  }

  onCommentSubmit() {
    this.loadComments();
  }

  onCommentDelete() {
    this.loadComments();
  }
}
