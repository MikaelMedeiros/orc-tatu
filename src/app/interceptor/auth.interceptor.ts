import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, switchMap, tap, throwError } from "rxjs";
import { Usuario } from "../pages/login/model/usuario";
import { Router } from "@angular/router";

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    return next(req).pipe(tap(event => {
      if (event.type === HttpEventType.Response) {
        console.log(req.url, 'returned a response with status', event.status);
      }
    }));
  }

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  user: Usuario | null | undefined;
  static refreshToken: string | null;
  refresh = false;

  constructor(private http: HttpClient, private router: Router) {}
  baseUrl: string = "http://localhost:8080"

  isLoginRoute(req: HttpRequest<any>, next: HttpHandler): boolean {
    return req.url == `${this.baseUrl}/authentication/url`;      
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.isLoginRoute(req, next)) return next.handle(req);

    

    this.user = this.recuperarObjetoLocalStorage('user');
    console.log(this.user)
    if(!this.user) {
      this.router.navigate(['/login']);
      return next.handle(req);
    }  

    if(this.user?.tokenInfoDTO.accessToken){
      const reqClone =  req.clone({
          setHeaders: {
              'Authorization' : `Bearer ${this.user?.tokenInfoDTO.accessToken}` ,
              'Content-Type' : "application/json"
          }
      })
      return next.handle(reqClone);
    }

    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !this.refresh) {
        this.refresh = true;

        let params = new HttpParams();
        params = params.append('refresh-token', `${this.user?.tokenInfoDTO.refreshToken}`);

        return this.http.get('http://localhost:8080/authentication/refresh-token', {withCredentials: true, params}).pipe(
          switchMap((res: any) => {
            this.setToken(res);
            return next.handle(req.clone({
              setHeaders: {
                Authorization: `Bearer ${this.user?.tokenInfoDTO.accessToken}`
              }
            }));
          })
        );
      }
      this.refresh = false;
      return throwError(() => err);
    }));
  }

  setToken(res: any) {
    if (this.user !== undefined && this.user !== null) {
      // Verifica se LoggingInterceptor.user.tokenInfoDTO está definido e não é nulo
      if (this.user.tokenInfoDTO !== undefined && this.user.tokenInfoDTO !== null) {
          // Atribui o valor de res.token para LoggingInterceptor.user.tokenInfoDTO.accessToken
          this.user.tokenInfoDTO.accessToken = res.accessToken;
          this.user.expiration = res.expiresInSeconds;
      }
  }
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
