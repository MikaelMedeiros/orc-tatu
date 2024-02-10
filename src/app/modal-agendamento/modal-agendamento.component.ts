import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-agendamento',
  templateUrl: './modal-agendamento.component.html',
  styleUrls: ['./modal-agendamento.component.css'],
})
export class ModalAgendamentoComponent {
 @Input() visible: boolean = false;
  date: Date | undefined;
  min: any;
}
