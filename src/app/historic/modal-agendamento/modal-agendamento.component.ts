import { Component, Input, ViewChild } from '@angular/core';
import { RadioButton } from 'primeng/radiobutton';
import { HistoricService } from '../service/historic.service';
import {  MessageService } from 'primeng/api';
import { Calendar } from 'primeng/calendar';
import { Nullable } from 'primeng/ts-helpers';


@Component({
  selector: 'app-modal-agendamento',
  templateUrl: './modal-agendamento.component.html',
  styleUrls: ['./modal-agendamento.component.css'],
})
export class ModalAgendamentoComponent{


  constructor(private historicoServie:HistoricService, private messageService: MessageService){}

 @Input() visible: boolean = false;
  date: Date  | Nullable;
  minDate: Date =  new Date();
  tipoTatoo: string = "tatoo";
  pagamentoAdiantado: string = "false";

  @ViewChild('tatoo') tatoo: RadioButton | undefined;

  agendar(){
    if (this.date === undefined) {
      this.messageService.add({ severity: 'error', summary: 'Erro ao agendar', detail: 'Por favor selecione data e hora.', life: 300000 });
      return; // Sair do método após exibir a mensagem de erro
    }
    console.log(this.date)
    console.log("Agendado");
    this.historicoServie.agendarTattoo(this.date)
  }

  fecharCalendario(calendar: Calendar){
    calendar.hideOverlay();
  }
}
