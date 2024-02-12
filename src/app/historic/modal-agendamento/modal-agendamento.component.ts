import { BudgetHistory } from '../model/budget-reponse';
import { Component, Input, ViewChild } from '@angular/core';
import { RadioButton } from 'primeng/radiobutton';
import { HistoricService } from '../service/historic.service';
import { MessageService } from 'primeng/api';
import { Calendar } from 'primeng/calendar';
import { Nullable } from 'primeng/ts-helpers';
import { AgendarService } from '../service/agendar.service';
import { AgendaDTO } from '../model/agendaDTO';

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
  tipoTatoo: string = 'tatoo';
  pagamentoAdiantado: string = 'false';

  @ViewChild('tatoo') tatoo: RadioButton | undefined;

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
        this.tipoTatoo,
        this.date,
        30
      )
    );
  }

  fecharCalendario(calendar: Calendar) {
    calendar.hideOverlay();
  }
}
