import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Follow } from '../models/follow.model';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private API_URL = 'http://localhost:9000';

  constructor(private _http: HttpClient) { }

  getFollowers(id: string): Observable<Follow[]> {
    return this._http.get<Follow[]>(`${this.API_URL}/user/${id}/followers`);
  }

  getFollowing(id: string): Observable<Follow[]> {
    return this._http.get<Follow[]>(`${this.API_URL}/user/${id}/following`);
  }

  isFollowing(follower: string, following: string): Observable<Follow> {
    return this._http.get<Follow>(`${this.API_URL}/user/${follower}/follows/${following}`);
  }

  follow(data: Follow): Observable<Follow> {
    return this._http.post<Follow>(`${this.API_URL}/user/follow`, data);
  }

  unfollow(data: Follow) {
    return this._http.post<Follow>(`${this.API_URL}/user/unfollow`, data);
  }

}
