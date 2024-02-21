import { Nullable } from "primeng/ts-helpers";

export class AgendaDTO {
 budgetID: number | Nullable;
 description: string | Nullable;
 summary: string | Nullable;
 startDateTime: Date | Nullable;
 tipoTattoo: string | Nullable;

 constructor(budgetID: number | Nullable,
  description: string | Nullable,
  summary: string| Nullable,
  startDateTime: Date| Nullable,
  tipoTattoo: string | Nullable){
   this.budgetID = budgetID;
   this.description = description;
   this.summary = summary;
   this.startDateTime = startDateTime;
   this.tipoTattoo = tipoTattoo;
  }
}
