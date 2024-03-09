import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: string = `${environment.apiUrl}/calculator`;

  getBodyLocal():Observable<HttpResponse<any>>{
   return this.httpClient.get<any>(`${this.baseUrl}/body-locals`).pipe();
  }
}
