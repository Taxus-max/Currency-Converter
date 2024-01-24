import { Component } from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {CurrencyDataService} from "../currency-data.service";
import { currentExchangeRates } from "../interfaces/interfaces";

@Component({
  selector: 'app-exchange-rate-current',
  standalone: true,
  imports: [
    MatGridTile,
    MatGridList
  ],
  templateUrl: './exchange-rate-current.component.html',
  styleUrl: './exchange-rate-current.component.css'
})
export class ExchangeRateCurrentComponent {
  constructor(private currencyDataService: CurrencyDataService) {}

  ngOnInit(){
    this.currentExchangeRates = this.currencyDataService.getCurrentRates();
  }

  currentExchangeRates: currentExchangeRates = {
    usdToEur: 0,
    eurToUsd: 0,
    usdTogbp: 0,
    gbpTousd: 0,
    eurTogbp: 0,
    gbpToEur: 0,
  }
}
