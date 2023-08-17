import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
// import jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'https://social-network-mean-stack-backend.onrender.com'; // Reemplaza con la URL de tu API en el servidor
  private loggedIn = new BehaviorSubject<boolean>(false);
  private redirectUrl = '/';

  constructor(private http: HttpClient) {
    this.checkToken(); // Verificar si ya existe un JWT almacenado al cargar el servicio
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.loggedIn.getValue();
  }

  // Método para obtener el token del usuario actualmente autenticado
  getToken(): string {
    return localStorage.getItem('token') || ''; // Si el token no está presente, retornará una cadena vacía
  }

  // Método para realizar la autenticación y guardar el token
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/user/login`, credentials)
      .pipe(
        // Manejo del resultado de la solicitud, aquí guardamos el token si es exitoso
        tap((response) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.loggedIn.next(true);
          }          
        })
      );
  }

  // Método para cerrar sesión y eliminar el token
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    // Lógica adicional para limpiar cualquier otro dato de sesión si es necesario
  }

  // Verificar si existe un token almacenado y establecer el estado de autenticación en el servicio
  private checkToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn.next(true);
    }
  }

  getUserLoggedIn(): any {
    const user = localStorage.getItem('user');
    const userJSON = JSON.parse(user);
    return userJSON;
  }

  verifyCurrentUser(id: string): any {
    const user = localStorage.getItem('user');
    const currenUser = JSON.parse(user);
    
    return (currenUser._id == id) ? true : false;
  }
  
  //Método para establecer la URL a redireccionar después del inicio de sesión
  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  // Método para obtener la URL a redireccionar después del inicio de sesión
  getRedirectUrl(): string {
    return this.redirectUrl;
  }
}
