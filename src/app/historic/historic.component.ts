import { Component, OnInit } from '@angular/core';
import { HistoricService } from './service/historic.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css']
})
export class HistoricComponent implements OnInit {
 
  budgets: any = [];

  constructor(
    private historicService: HistoricService,
    private fb: FormBuilder
  ) {}
  

  ngOnInit(): void {
    this.budgets = this.historicService.getHistoric();
  }

  historicForm = this.fb.group({
    titulo: [''],
    descricao: [''],    
  }) 

  agendar() {
    let agendamento = this.historicForm.getRawValue();
    this.historicService.agendarTattoo(agendamento).subscribe(
      (data: any) => console.log('Deu bom!', data)
    );
  }

  resetForm() {
    this.historicForm.reset();
  }
}
