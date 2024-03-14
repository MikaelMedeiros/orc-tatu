import { ScheduleInfoDTO } from '../model/schedule-info-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendarService {
  baseUrl: string = `${environment.apiUrl}/events`;
  constructor(private http: HttpClient) { }


  agendar(agendaDTO: ScheduleInfoDTO){
   return this.http.post(this.baseUrl, agendaDTO).pipe()
  }
}
