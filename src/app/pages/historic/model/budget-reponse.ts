import { Nullable } from 'primeng/ts-helpers';

export class BudgetHistory {
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
  netValue: number | null;
  grossValue: number | null;
  studioFee: number | null;
  tattooValue: number | null;
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
    status: string | null,
    id: number | Nullable,
    netValue: number | null,
    grossValue: number | null,
    studioFee: number | null,
    tattooValue: number | null
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
    this.id = id;
    this.netValue = netValue;
    this.grossValue = grossValue;
    this.studioFee = studioFee;
    this.tattooValue = tattooValue
  }
}
