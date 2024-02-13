import { Nullable } from "primeng/ts-helpers";

export class AgendaDTO {
 budgetID: number | Nullable;
 description: string | Nullable;
 summary: string | Nullable;
 startDateTime: Date | Nullable;
 tempo?: number | Nullable;

 constructor(budgetID: number | Nullable,
  description: string | Nullable,
  summary: string| Nullable,
  startDateTime: Date| Nullable,
  tempo: number | Nullable){
   this.budgetID = budgetID;
   this.description = description;
   this.summary = summary;
   this.startDateTime = startDateTime;
   this.tempo = tempo;
  }
}
