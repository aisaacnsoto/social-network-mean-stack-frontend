import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = 'http://localhost:9000';

  constructor(private _http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this._http.get<User[]>(`${this.API_URL}/user/listar`);
  }

  getByID(id: string): Observable<User> {
    return this._http.get<User>(`${this.API_URL}/user/listar/${id}`);
  }

  create(data: User): Observable<User> {
    return this._http.post<User>(`${this.API_URL}/user/register`, data);
  }

  update(id: string, data: User) {
    return this._http.put(`${this.API_URL}/user/actualizar/${id}`, data);
  }

  delete(id: string) {
    return this._http.delete(`${this.API_URL}/user/eliminar/${id}`);
  }

}
