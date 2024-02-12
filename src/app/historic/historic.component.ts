import { ModalAgendamentoComponent } from './modal-agendamento/modal-agendamento.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HistoricService } from './service/historic.service';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BudgetHistory } from './model/budget-reponse';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

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
  @ViewChild(ModalAgendamentoComponent, { static: false })
  modalAgendamento!: ModalAgendamentoComponent;
  formFiltersGroup: FormGroup | any;

  constructor(
    private historicService: HistoricService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initFormFilters();
    this.responsiveOption();
    this.getBudgets();
  }

  getBudgets(){
     this.historicService.getHistoric().subscribe({
      next: (res:BudgetHistory[])=>{
        this.budgets = res
      },
      error: (error:HttpErrorResponse)=>{
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmado',
          detail: (this.errorBuild(error)),
          life: 300000,
        });
      }
    })
  }

  errorBuild(erro : any){
    if(erro.status = '401'){
      return 'vc errou';
    }
    return ''
  }

  initFormFilters() {
    this.formFiltersGroup = new FormGroup({
      nome: new FormControl<string | null>(null),
      data: new FormControl<Date | null>(null),
    });
  }

  responsiveOption() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 2,
      },
    ];
  }

  historicForm = this.fb.group({
    titulo: [''],
    descricao: [''],
  });

  agendar() {
    let agendamento = this.historicForm.getRawValue();
    this.historicService
      .agendarTattoo(agendamento)
      .subscribe((data: any) => console.log('Deu bom!', data));
  }

  resetForm() {
    this.historicForm.reset();
  }

  getClassBalls(status: string): any {
    const colorClasses = {
      ball: true,
      green: status === 'Done',
      red: status === 'Canceled' || status === null,
      yellow: status === 'Scheduled',
      blue: status === 'Budgeted',
      // Adicione mais cores conforme necessário
    };

    return colorClasses;
  }

  getTooltipText(status: string): string {
    switch (status) {
      case 'Done':
        return 'Tattoo concluida';
      case 'Canceled':
        return 'Orçamento cancelado';
      case 'Scheduled':
        return 'Tattoo agendado';
      case 'Budgeted':
        return 'Orçado';
      default:
        return 'Sem informação';
    }
  }

  handlePageChange(event: any): void {
    this.currentIndex = event.page + 1;
  }

  returnsAmountCollected(): number {
    console.log(this.budgets)
    if(this.budgets){
    return this.budgets
      .filter((budget: { status: string }) => budget.status === 'verde')
      .reduce(
        (total: any, budget: { tattooValue: any }) =>
          total + (budget.tattooValue || 0),
        0
      );
    }else{
      return this.budgets;
    }
  }

  confirm1(event: Event, budget: BudgetHistory) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Voce deseja cancelar esse orçamento?',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        budget.status = 'cancelado';
        this.historicService.atualizarBudget(budget);
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmado',
          detail: 'Esse orçamento foi cancelado',
          life: 300000,
        });
      },
      reject: () => {},
    });
    this.messageService.clear();
  }


  showDialgAgendar() {
    this.modalAgendamento.visible = true;
  }

  exibeModal() {
    this.modalAgendamento.visible = true;
  }
}
