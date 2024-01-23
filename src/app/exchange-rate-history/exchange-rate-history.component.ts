import {Component, numberAttribute} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";

interface rateCurrencies{
  USD: number,
  EUR: number,
  YEN: number,
  AUD: number,
  GBP: number,
  CHF: number,
  CAD: number,
  HKD: number,
  NZD: number,
  CNH: number

}

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
  selectedCurrency: string = "";
  exchangeRates: rateCurrencies = {
    USD: 0,
    EUR: 0,
    YEN: 0,
    AUD: 0,
    GBP: 0,
    CHF: 0,
    CAD: 0,
    HKD: 0,
    NZD: 0,
    CNH: 0
  }
}
