import { ModalAgendamentoComponent } from './modal-agendamento/modal-agendamento.component';
import { AfterViewInit, Component, Directive, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HistoricService } from './service/historic.service';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BudgetHistory } from './model/budget-reponse';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { ToastService } from 'src/app/shared/toast.service';


@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css'],

})

export class HistoricComponent implements OnInit{

  budgets: any = [];
  responsiveOptions: any[] | undefined;
  currentIndex: number | undefined;
  visible: boolean = false;
  @ViewChild(ModalAgendamentoComponent, { static: false }) modalAgendamento!: ModalAgendamentoComponent;
  formFiltersGroup!: FormGroup<any>;
  isCanleados: boolean = false;
  isAgendados: boolean =false;
  autocompleteBudget: any[]  =[];
  modalBudgetInput: BudgetHistory | any;

  constructor(
    private historicService: HistoricService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private renderer: Renderer2,
    private toastService: ToastService
  ) {}



  ngOnInit(): void {
    this.initFormFilters();
    this.responsiveOption();
    this.removeClassCheckbox();
  }

  filtrarCancelados(novoValor: boolean) {
    this.isCanleados = novoValor;
  }

  onNameAutocompleSelect(selectedBudget: any) {
    this.filtrarBudgets();
  }

  filtrarBudgets(): BudgetHistory[] {
    let filteredBudgets: BudgetHistory[] = this.budgets;
    if (this.isCanleados === true) {
      filteredBudgets = this.budgets.filter((budget: { status: number; }) => budget.status === 3); // Filtrar orçamentos cancelados
    }
    if (this.isAgendados === true) {
      const agendados = this.budgets.filter((budget: { status: number; }) => budget.status === 1);
      filteredBudgets = filteredBudgets.concat(agendados);
    }

    if (this.formFiltersGroup.get('nome')?.value) {
      filteredBudgets = filteredBudgets.filter((budget: { clientName: string | null }) =>
        budget.clientName?.toLowerCase().includes(this.formFiltersGroup?.get('nome')?.value.toLowerCase())
      );
    }
    return filteredBudgets;
}

  removeClassCheckbox(){
    const checkbox = document.querySelector('p-checkbox');
  // Verifique se o elemento foi encontrado antes de tentar remover a classe
  if (checkbox) {

    // Use o Renderer2 para remover a classe do elemento
    this.renderer.removeClass(checkbox, 'p-checkbox-box');
  }

  }

  getBudgets(){
     this.historicService.getHistoric().subscribe({
      next: (res:BudgetHistory[])=>{
        this.budgets = res
      },
      error: (error:HttpErrorResponse)=>{
        this.toastService.errorHandler(error);
      }
    })
  }

  initFormFilters() {
    this.formFiltersGroup = new FormGroup({
      nome: new FormControl<String | null>(null),
      data: new FormControl<Date[] | null>(null),
    });
  }

  autocompleBudget(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.budgets.length; i++) {
        let budget = this.budgets[i];
        if (budget.clientName.toLowerCase().indexOf(query.toLowerCase()) === 0 && !filtered.includes(budget.clientName)) {
            filtered.push(budget.clientName);
        }
    }

    this.autocompleteBudget = filtered;
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


  showDialgAgendar(budget: BudgetHistory) {
    this.modalAgendamento.visible = true;
    this.modalBudgetInput = budget;
  }

}
