import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Like } from '../models/like.model';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private API_URL = 'https://social-network-mean-stack-backend.onrender.com';

  constructor(private _http: HttpClient) { }

  like(data: Like): Observable<Like> {
    return this._http.post<Like>(`${this.API_URL}/post/like`, data);
  }

  dislike(data: Like) {
    return this._http.post<Like>(`${this.API_URL}/post/dislike`, data);
  }

  isLiked(data: Like) {
    return this._http.get<Like>(`${this.API_URL}/post/isliked/${data.post}/${data.user}`);
  }

}
