import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private API_URL = 'https://social-network-mean-stack-backend.onrender.com';

  constructor(private _http: HttpClient) { }

  getAll(): Observable<Comment[]> {
    return this._http.get<Comment[]>(`${this.API_URL}/comment/listar`);
  }

  getByID(id: string): Observable<Comment> {
    return this._http.get<Comment>(`${this.API_URL}/comment/listar/${id}`);
  }

  getByPost(id: string): Observable<Comment[]> {
    return this._http.get<Comment[]>(`${this.API_URL}/comment/listar/post/${id}`);
  }

  create(data: Comment): Observable<Comment> {
    return this._http.post<Comment>(`${this.API_URL}/comment/register`, data);
  }

  update(id: string, data: Comment) {
    return this._http.put<Comment>(`${this.API_URL}/comment/actualizar/${id}`, data);
  }

  delete(id: string) {
    return this._http.delete<Comment>(`${this.API_URL}/comment/eliminar/${id}`);
  }
  
}
