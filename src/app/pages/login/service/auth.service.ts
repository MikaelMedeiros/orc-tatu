import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';

import { Observable, map } from 'rxjs';
import { LoggingInterceptor, loggingInterceptor } from 'src/app/interceptor/auth.interceptor';

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

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:8080/authentication' ;

  retrieveGoogleLoginUrl(): any {
    return this.http.get(`${this.baseUrl}/url`);
  }

  getUser(code: string): Observable<boolean> {
    return this.http.get<Usuario>(this.baseUrl+"/callback?code=" + code, {observe: "response"})
      .pipe(map((response: HttpResponse<Usuario>) => {
        if (response.status === 200 && response.body !== null) {
          this.user = response.body; 
          return true;
        } else {
          return false;
        }
      }));
  }



}
