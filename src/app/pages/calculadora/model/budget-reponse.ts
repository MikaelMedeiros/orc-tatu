import { Nullable } from 'primeng/ts-helpers';

export class BudgetRequest {
  id: number | Nullable;
  clientName: string | null;
  description: string | Nullable;
  draw: string | null;
  centimeter: number | null;
  pricePerCentimeter: number | null;
  bodyLocal: string | null;
  styles: string[] | null;
  details: string[] | null;
  studioPercentage: number | null;
  parkingCost: number | null;
  materialCost: number | null;
  creditCardFee: number | null;
  status: string | null;
  constructor(
    clientName: string | null,
    description: string | Nullable,
    draw: string | null,
    centimeter: number | null,
    pricePerCentimeter: number | null,
    bodyLocal: string | null,
    styles: string[] | null,
    details: string[] | null,
    studioPercentage: number | null,
    parkingCost: number | null,
    materialCost: number | null,
    creditCardFee: number | null,
    status: string | null

  ) {
    this.clientName = clientName;
    this.description = description;
    this.draw = draw;
    this.centimeter = centimeter;
    this.pricePerCentimeter = pricePerCentimeter;
    this.bodyLocal = bodyLocal;
    this.styles = styles;
    this.details = details;
    this.studioPercentage = studioPercentage;
    this.parkingCost = parkingCost;
    this.materialCost = materialCost;
    this.creditCardFee = creditCardFee;
    this.status = status;

  }
}
