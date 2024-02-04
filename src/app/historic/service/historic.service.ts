import { Injectable } from '@angular/core';
import { BudgetHistory } from '../model/budget-history';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/login/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HistoricService {

  baseUrl: string = "http://localhost:8080/budgets"
  token: string = "";

  constructor(private http: HttpClient, private authService: AuthService) { }

  getHistoric() {

    return [
      new BudgetHistory('Mikaelfo', "Mikaelfo, seu orçamento deu 100 conto", 70, 30, 100, "verde"),
      new BudgetHistory('Bentorc', "Bentorc, seu orçamento deu 100 conto", 70, 30, 100, "amarelo"),
      new BudgetHistory('Leticeira', "Leticeira, seu orçamento deu 100 conto", 70, 30, 100, "vermelho"),
      new BudgetHistory('Mikaelson', "Mikaelson, seu orçamento deu 100 conto", 70, 30, 100, "azul")

    ]
  }

  saveOnBudgetHistory(budget: BudgetHistory) {
    let options: any = {headers: new HttpHeaders({"Authorization": "Bearer " + this.authService.token})};

    return this.http.post(this.baseUrl, budget, options);
  }

  agendarTattoo(agendamento: any) {
    return this.http.post('http://localhost:8080/events', agendamento);
  }
}
