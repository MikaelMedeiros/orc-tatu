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
  endDate: Date | Nullable;
  constructor(
    private agendarService: AgendarService,
    private messageService: MessageService
  ) {}

  @Input() budget: BudgetHistory | Nullable;
  visible: boolean = false;
  startDate: Date | Nullable;
  minDate: Date = new Date();
  tipoAgendamento: string = 'tattoo';
  duration: string = '03:00';
  pagamentoAdiantado: boolean = false;
  paymentMehtod: string = "PIX";
  time: Date | any;

  @ViewChild('tattoo') tattoo: RadioButton | undefined;


  validacaoAgendar(){
    if (this.startDate === null && this.startDate === undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro ao agendar',
        detail: 'Por favor selecione data e hora.',
        life: 3000,
      });
      return; // Sair do método após exibir a mensagem de erro
    } else {
      //this.startDate = this.setToBrazilTimezone(this.startDate);
    }

    if (this.duration === undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro ao agendar',
        detail: 'Por favor informe a duração',
        life: 3000,
      });
      return; // Sair do método após exibir a mensagem de erro
    } else {
      this.addTattooDuration();
    }

  }
  agendar() {
    this.validacaoAgendar();
    this.agendarService.agendar(
      new AgendaDTO(
        this.budget?.id,
        this.budget?.description,
        `${this.budget?.clientName}: ${this.budget?.draw}`,
        this.setToBrazilTimezone(this.startDate),
        this.setToBrazilTimezone(this.endDate),
        this.tipoAgendamento,
        this.pagamentoAdiantado,
        this.paymentMehtod,
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

  public addTattooDuration() {
    const startDate = this.startDate;
    if(startDate) {
      this.endDate = new Date(startDate);
      let tempoDuracao = this.duration.split(':');
      let horaDuracao = Number(tempoDuracao[0]);
      let minDuracao = Number(tempoDuracao[1])
      this.endDate.setHours(startDate.getHours() + horaDuracao);
      this.endDate.setMinutes(startDate.getMinutes() + minDuracao)
    }
  }

  setToBrazilTimezone(date: Date | Nullable) {
    if(date) {
      let brazilDateStr = new Date(date).toLocaleString("en-US", {timeZone: "America/Sao_Paulo"});
      return new Date(brazilDateStr).getTime();
    } else {
      console.log('nao converteu')
      return date;
    }
  }
}
