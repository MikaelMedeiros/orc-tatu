import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BudgetHistory } from '../model/budget-reponse';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HistoricService {

  baseUrl: string = "http://localhost:8080/budgets"
  token: string = "";

  constructor(private http: HttpClient) { }

  getHistoric():Observable<BudgetHistory[]>{
    return this.http.get<BudgetHistory[]>(this.baseUrl).pipe();
  }

  saveOnBudgetHistory(budget: BudgetHistory) {
    return this.http.post(this.baseUrl, budget);
  }

  agendarTattoo(agendamento: any) {
    return this.http.post('http://localhost:8080/events', agendamento);
  }


  atualizarBudget(budget: BudgetHistory){
    console.log('atualizado com sucesso')
  }
}
