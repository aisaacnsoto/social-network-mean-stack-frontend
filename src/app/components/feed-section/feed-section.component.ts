import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-feed-section',
  templateUrl: './feed-section.component.html',
  styleUrls: ['./feed-section.component.css']
})
export class FeedSectionComponent {

  @Input()
  posts: Post[];

  @Output()
  delete: EventEmitter<Post> = new EventEmitter<Post>();

  @Output()
  edit: EventEmitter<Post> = new EventEmitter<Post>();


  onDeleteClick(post: Post) {
    
    this.delete.emit(post);
  }

  onEditClick(post: Post) {
    console.log('feed section',post);
    this.edit.emit(post);
  }
}
