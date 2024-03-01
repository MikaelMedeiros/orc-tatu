import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: string = "http://localhost:8080/calculator"

  getBodyLocal():Observable<HttpResponse<any>>{
   return this.httpClient.get<any>(`${this.baseUrl}/body-locals`).pipe();
  }
}
