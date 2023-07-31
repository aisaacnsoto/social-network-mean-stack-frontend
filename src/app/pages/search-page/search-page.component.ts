import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  searchQuery: string;
  posts: Post[] = [];

  constructor(
    private _postService: PostService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.searchQuery = this._route.snapshot.paramMap.get('query');
    console.log('this.searchQuery', this.searchQuery);

    this.listarPosts();

  }

  listarPosts() {
    this._postService.search(this.searchQuery).subscribe({
      next: data => {
        this.posts = data;
        console.log('this.posts', this.posts);
        
      }
    })
  }
}
