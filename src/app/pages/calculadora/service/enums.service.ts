import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EnumType } from '../model/enum-type';
import { EnumResponse } from '../model/enum-response';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: string = `${environment.apiUrl}/enums`;

  getEnum(enumType: EnumType):Observable<HttpResponse<EnumResponse[]>>{
   return this.httpClient.get<any>(`${this.baseUrl}/${enumType}`).pipe();
  }
}
