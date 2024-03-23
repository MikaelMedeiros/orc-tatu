import { Nullable } from "primeng/ts-helpers";

export class ScheduleInfoDTO {
  budgetId: number | Nullable;
  description: string | Nullable;
  summary: string | Nullable;
  start: any | Nullable;
  end: any | Nullable;
  scheduleType: string | Nullable;
  isPaid: boolean | Nullable; 
  paymentMethod: string | Nullable;

 constructor(budgetID: number | Nullable,
  description: string | Nullable,
  summary: string| Nullable,
  startDateTime: any| Nullable,
  endDateTime: any | Nullable,
  tipoAgendamento: string | Nullable,
  paid: boolean | Nullable,
  paymentMehtod: string | Nullable){
   this.budgetId = budgetID;
   this.description = description;
   this.summary = summary;
   this.start = startDateTime;
   this.end = endDateTime;
   this.scheduleType = tipoAgendamento;
   this.isPaid = paid;
   this.paymentMethod = paymentMehtod;
  }
}
