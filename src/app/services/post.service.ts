import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private API_URL = 'https://social-network-mean-stack-backend.onrender.com';
  private headers = new HttpHeaders({
    'Authorization': this._authService.getToken()
  });

  constructor(
    private _http: HttpClient,
    private _authService: AuthService
  ) {
  }

  getAll(): Observable<Post[]> {
    return this._http.get<Post[]>(`${this.API_URL}/post/listar`);
  }

  getByID(id: string): Observable<Post> {
    return this._http.get<Post>(`${this.API_URL}/post/listar/${id}`);
  }

  getByAutor(id: string): Observable<Post[]> {
    return this._http.get<Post[]>(`${this.API_URL}/post/listar/autor/${id}`);
  }

  search(query: string): Observable<Post[]> {
    return this._http.get<Post[]>(`${this.API_URL}/post/search/${query}`);
  }

  create(data: Post): Observable<Post> {
    return this._http.post<Post>(`${this.API_URL}/post/register`, data, { headers: this.headers });
  }

  update(id: string, data: Post) {
    return this._http.put(`${this.API_URL}/post/actualizar/${id}`, data);
  }

  delete(id: string) {
    return this._http.delete(`${this.API_URL}/post/eliminar/${id}`);
  }
}
