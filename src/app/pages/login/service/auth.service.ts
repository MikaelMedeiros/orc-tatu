import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http'
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';

import { Observable, map } from 'rxjs';
import { LoggingInterceptor, loggingInterceptor } from 'src/app/interceptor/auth.interceptor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarios: Usuario[] = [
    new Usuario()
  ]

  user: Usuario = new Usuario();

  constructor(private http: HttpClient, private router: Router) { }

  baseUrl: string = `${environment.apiUrl}/authentication` ;

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

  revokeToken(): Observable<HttpResponse<any>> {
    this.user = this.recuperarObjetoLocalStorage('user');
    let tokenToRevoke = '';

    if(this.user?.refreshToken) {
      tokenToRevoke = this.user?.refreshToken;
    } else {
      tokenToRevoke = this.user?.accessToken;
    }
      

    let params = new HttpParams();
        params = params.append('token', `${tokenToRevoke}`);
    
    return this.http.get<any>(`${this.baseUrl}/revoke`, {params} ).pipe();
  }


  recuperarObjetoLocalStorage(chave: string): any {
    const objetoString = localStorage.getItem(chave);
    
    try {
      if (objetoString && objetoString !== null && objetoString !== '{}') {
        return JSON.parse(objetoString);
      }
    } catch (error) {
      this.router.navigate(['/login']);
    }
    

    return null;
  }

}
