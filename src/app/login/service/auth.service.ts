import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Usuario } from '../usuario';
import { Router } from '@angular/router';

import { Observable, map } from 'rxjs';
import { Token } from '../model/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarios: Usuario[] = [
    {nome: 'mika', senha: '123'},
    {nome: 'ju', senha: '123'},
    new Usuario()
  ]

  token: string = "";

  private usuarioAutenticado = false;

  constructor(private http: HttpClient, private router: Router) { }

  baseUrl: string = 'http://localhost:8080/auth' ;

  fazerLogin(): any {
    return this.http.get(`${this.baseUrl}/url`);
  }

  getToken(code: string): Observable<boolean> {
    return this.http.get<Token>("http://localhost:8080/auth/callback?code=" + code, {observe: "response"})
      .pipe(map((response: HttpResponse<Token>) => {
        if (response.status === 200 && response.body !== null) {
          this.token = response.body.token;
          return true;
        } else {
          return false;
        }
      }));
  }

  existe(usuario: Usuario): boolean {
    return this.usuarios.some(obj => obj.nome === usuario.nome && obj.senha === usuario.senha);
  }
}
