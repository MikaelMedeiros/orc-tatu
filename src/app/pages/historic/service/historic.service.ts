import { BudgetRequest } from './../../calculadora/model/budget-reponse';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BudgetHistory } from '../model/budget-reponse';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HistoricService {

  baseUrl: string = `${environment.apiUrl}/budgets`;
  token: string = "";

  constructor(private http: HttpClient) { }

  getHistoric():Observable<BudgetHistory[]>{
    return this.http.get<BudgetHistory[]>(this.baseUrl).pipe();
  }

  saveOnBudgetHistory(budget: BudgetRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.baseUrl, budget,{observe: 'response'});
  }

  //TODO Mudar essa chamada para uma service de agendamento;
  agendarTattoo(agendamento: any) {
    return this.http.post(`${environment.apiUrl}/events`, agendamento);
  }


  atualizarBudget(budget: BudgetHistory){
    console.log('atualizado com sucesso')
  }
}
