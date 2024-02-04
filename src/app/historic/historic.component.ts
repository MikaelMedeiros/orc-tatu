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
  responsiveOptions: any[] | undefined;
  currentIndex: number | undefined;

  constructor(
    private historicService: HistoricService,
    private fb: FormBuilder
  ) {}


  ngOnInit(): void {
    this.budgets = this.historicService.getHistoric();
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
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

  getClassBalls(status: string): any {
    const colorClasses = {
      'ball': true,
      'green': status === 'verde',
      'red': status === 'vermelho'  || status === null,
      'yellow': status === 'amarelo',
      'blue': status === 'azul',
      // Adicione mais cores conforme necessário
    };

    return colorClasses;
  }

  getTooltipText(status: string): string {
    switch (status) {
      case 'verde':
        return 'Tatoo concluida';
      case 'vermelho':
        return 'Orçamento cancelado';
      case 'amarelo':
        return 'Tatoo agendado';
      case 'azul':
        return 'Foi feito o orçamento';
      default:
        return 'Sem informação';
    }
  }

  handlePageChange(event: any): void {
    this.currentIndex = event.page + 1;
  }


  returnsAmountCollected(): number{
    return this.budgets.filter((budget: { status: string; }) => budget.status === "verde")
    .reduce((total: any, budget: { tattooValue: any; }) => total + (budget.tattooValue || 0), 0);
  }

}
