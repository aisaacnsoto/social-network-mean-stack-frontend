import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import moment from 'moment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input()
  comment: Comment;

  @Output()
  delete = new EventEmitter<Comment>();

  constructor(private _commentService: CommentService) { }
  
  ngOnInit(): void {
    this.comment.created_at = moment(this.comment.created_at).locale('es').fromNow();
  }

  onDeleteClick() {
    this._commentService.delete(this.comment._id).subscribe({
      next: data => {
        this.delete.emit(data);
      }
    })
  }
}
