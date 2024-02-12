import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BudgetHistory } from '../model/budget-reponse';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/login/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HistoricService {

  baseUrl: string = "http://localhost:8080/budgets"
  token: string = "";

  constructor(private http: HttpClient, private authService: AuthService) { }

  getHistoric():Observable<BudgetHistory[]>{
    return this.http.get<BudgetHistory[]>(this.baseUrl).pipe();
  }

  saveOnBudgetHistory(budget: BudgetHistory) {
    let options: any = {headers: new HttpHeaders({"Authorization": "Bearer " + this.authService.token})};

    return this.http.post(this.baseUrl, budget, options);
  }

  agendarTattoo(agendamento: any) {
    return this.http.post('http://localhost:8080/events', agendamento);
  }


  atualizarBudget(budget: BudgetHistory){
    console.log('atualizado com sucesso')
  }
}
