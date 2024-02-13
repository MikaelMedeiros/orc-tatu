import { AgendaDTO } from './../model/agendaDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/login/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AgendarService {
  baseUrl: string = "http://localhost:8080/events"
  constructor(private http: HttpClient, private authService: AuthService) { }

  agendar(agendaDTO: AgendaDTO){
   return this.http.post(this.baseUrl, agendaDTO).pipe()
  }
}
