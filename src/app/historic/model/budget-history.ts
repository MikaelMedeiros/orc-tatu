export class BudgetHistory {
  clientName: string | null;
  desc: string | null;
  netValue: number | null;
  studioPercent: number | null;
  tattooValue: number | null;
  status: string | null;

  constructor(clientName: string | null, desc: string | null, netValue: number | null, studioPercent: number | null, tattooValue: number | null, status: string | null) {
      this.clientName = clientName;
      this.desc = desc;
      this.netValue = netValue;
      this.studioPercent = studioPercent;
      this.tattooValue = tattooValue;
      this.status = status;
  }
}
