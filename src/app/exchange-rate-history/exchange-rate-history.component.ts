import {Component} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {CurrencyDataService} from "../currency-data.service";
import { rateCurrencies } from "../interfaces/interfaces";

@Component({
  selector: 'app-exchange-rate-history',
  standalone: true,
  imports: [
    MatGridTile,
    MatGridList
  ],
  templateUrl: './exchange-rate-history.component.html',
  styleUrl: './exchange-rate-history.component.css'
})

export class ExchangeRateHistoryComponent {
  constructor(private currencyDataService: CurrencyDataService) {
    this.currencyDataService.latestExchangeDetailsChange.subscribe(value => {
      this.selectedCurrency = value.to;
    });
    this.currencyDataService.latestCurrencyRatesChange.subscribe(value => {
      this.exchangeRates = value;
    });
  }

  selectedCurrency: string = "{No currency selected}";
  exchangeRates: rateCurrencies = {
    USD: 0,
    EUR: 0,
    JPY: 0,
    AUD: 0,
    GBP: 0,
    CHF: 0,
    CAD: 0,
    HKD: 0,
    NZD: 0,
    CNH: 0
  };
}
