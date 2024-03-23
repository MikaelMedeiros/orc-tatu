import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, switchMap, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Usuario } from "../pages/login/model/usuario";

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
  baseUrl: string = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private router: Router) {}

  isLoginRoute(req: HttpRequest<any>, next: HttpHandler): boolean {
    return req.url == `${this.baseUrl}/authentication/url`;      
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.isLoginRoute(req, next)) return next.handle(req);
    this.user = this.recuperarObjetoLocalStorage('user');
    if(!this.user) {
      this.router.navigate(['/login']);
      return next.handle(req);
    }
    
    if(this.user?.accessToken && !this.tokenExpired(this.user)){  
      const reqClone =  req.clone({
          setHeaders: {
              'Authorization' : `Bearer ${this.user?.accessToken}` ,
              'Content-Type' : "application/json"
          }
      })
      this.refresh = false;
      return next.handle(reqClone);
    }

    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !this.refresh) {
        this.refresh = true;

        let params = new HttpParams();
        params = params.append('token', `${this.user?.refreshToken}`);
        return this.http.get(`${this.baseUrl}/authentication/refresh`, {params}).pipe(
          switchMap((res: any) => {
            this.setToken(res);
            return next.handle(req.clone({
              setHeaders: {
                "Authorization": `Bearer ${this.user?.accessToken}`,
                'Content-Type' : "application/json"
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
        this.user.accessToken = res.accessToken;           
        this.user.expiration = res.expiration;
        this.salvarObjetoLocalStorage('user', this.user);   
    }
  }

  tokenExpired(user: Usuario): boolean {
    return user.expiration < Date.now();    
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

  salvarObjetoLocalStorage(chave: string, objeto: Usuario): void {
    localStorage.setItem(chave, JSON.stringify(objeto));
  }
}
