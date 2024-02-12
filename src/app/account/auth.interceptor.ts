import { HttpEvent, HttpEventType, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    return next(req).pipe(tap(event => {
      if (event.type === HttpEventType.Response) {
        console.log(req.url, 'returned a response with status', event.status);
      }
    }));
  }

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request URL: ' + req.url);
    let token: string | null  = window.localStorage.getItem('token');
    if(token) {
        const reqClone =  req.clone({
            setHeaders: {
                'Authorization' : 'Bearer '+token,
                'Content-Type' : "application/json"
            }
        })
        return next.handle(reqClone);
    }
    return next.handle(req);
  }
}
