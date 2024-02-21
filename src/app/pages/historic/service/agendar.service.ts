import { AgendaDTO } from './../model/agendaDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgendarService {
  baseUrl: string = "http://localhost:8080/events"
  constructor(private http: HttpClient) { }


  agendar(agendaDTO: AgendaDTO){
   return this.http.post(this.baseUrl, agendaDTO).pipe()
  }
}
