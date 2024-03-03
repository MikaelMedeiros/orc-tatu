import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Calendar } from 'primeng/calendar';
import { RadioButton } from 'primeng/radiobutton';
import { Nullable } from 'primeng/ts-helpers';
import { AgendaDTO } from '../model/agendaDTO';
import { BudgetHistory } from '../model/budget-reponse';
import { AgendarService } from '../service/agendar.service';

@Component({
  selector: 'app-modal-agendamento',
  templateUrl: './modal-agendamento.component.html',
  styleUrls: ['./modal-agendamento.component.css'],
})
export class ModalAgendamentoComponent {
  constructor(
    private agendarService: AgendarService,
    private messageService: MessageService
  ) {}

  @Input() budget: BudgetHistory | Nullable;
  visible: boolean = false;
  date: Date | Nullable;
  minDate: Date = new Date();
  tipoTattoo: string = 'tattoo';
  pagamentoAdiantado: string = 'false';


  @ViewChild('tattoo') tattoo: RadioButton | undefined;


  agendar() {
    if (this.date === undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro ao agendar',
        detail: 'Por favor selecione data e hora.',
        life: 300000,
      });
      return; // Sair do método após exibir a mensagem de erro
    }

    this.agendarService.agendar(
      new AgendaDTO(
        this.budget?.id,
        this.budget?.description,
        `${this.budget?.clientName}: ${this.budget?.draw}`,
        this.date,
        this.tipoTattoo
      )
    ).subscribe({
      next:(n) =>{
        this.messageService.add({
          severity: 'success',
          detail: 'Agendado.',
          life: 3000,
        });
      },
      error: (error:HttpErrorResponse)=>{
        error.status
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: error.message,
          life: 3000,
        });
      }
    })

  }

  fecharCalendario(calendar: Calendar) {
    calendar.hideOverlay();
  }
}
