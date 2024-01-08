import { Component, OnInit } from '@angular/core';
import { HistoricService } from './service/historic.service';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css']
})
export class HistoricComponent implements OnInit {
 
  budgets: any = [];

  constructor(private historicService: HistoricService) {}
  

  ngOnInit(): void {
    this.budgets = this.historicService.getHistoric();
  }
}
