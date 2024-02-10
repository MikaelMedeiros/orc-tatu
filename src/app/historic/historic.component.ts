import { ModalAgendamentoComponent } from './../modal-agendamento/modal-agendamento.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HistoricService } from './service/historic.service';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { BudgetHistory } from './model/budget-history';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css'],
})
export class HistoricComponent implements OnInit {

  budgets: any = [];
  responsiveOptions: any[] | undefined;
  currentIndex: number | undefined;
  visible: boolean = false;
  @ViewChild(ModalAgendamentoComponent, {static: false})
  modalAgendamento: ModalAgendamentoComponent | undefined;

  constructor(
    private historicService: HistoricService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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
      'green': status === 'Done',
      'red': status === 'Canceled'  || status === null,
      'yellow': status === 'Scheduled',
      'blue': status === 'Budgeted',
      // Adicione mais cores conforme necessário
    };

    return colorClasses;
  }

  getTooltipText(status: string): string {
    switch (status) {
      case 'Done':
        return 'Tatoo concluida';
      case 'Canceled':
        return 'Orçamento cancelado';
      case 'Scheduled':
        return 'Tatoo agendado';
      case 'Budgeted':
        return 'Orçado';
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


  confirm1(event: Event, budget: BudgetHistory) {
    console.log('arou')
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Voce deseja cancelar esse orçamento?',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
            budget.status = 'cancelado'
            this.historicService.atualizarBudget(budget);
            this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Esse orçamento foi cancelado', life: 300000 });
        },
        reject: () => {

        }
    });
    this.messageService.clear();
}




 returnMsgEvents():string {
  return 'Voce deseja cancelar esse orçamento?'
 }

 showDialgAgendar(){
  console.log('rapa');
  this.visible= true;
 }
}
