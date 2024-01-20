import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Usuario } from '../usuario';
import { Router } from '@angular/router';

import { Observable, map } from 'rxjs';
import { Token } from '../model/token'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarios: Usuario[] = [
    new Usuario()
  ]

  user: Usuario = new Usuario();

  public token: string = "";

  private usuarioAutenticado = false;

  constructor(private http: HttpClient, private router: Router) { }

  baseUrl: string = 'http://localhost:8080/auth' ;

  retrieveGoogleLoginUrl(): any {
    return this.http.get(`${this.baseUrl}/url`);
  }

  getUser(code: string): Observable<boolean> {
    return this.http.get<Usuario>("http://localhost:8080/auth/callback?code=" + code, {observe: "response"})
      .pipe(map((response: HttpResponse<Usuario>) => {
        if (response.status === 200 && response.body !== null) {
          this.token = response.body.token;
          this.user = response.body;
          console.log(this.user)
          return true;
        } else {
          return false;
        }
      }));
  }



}
