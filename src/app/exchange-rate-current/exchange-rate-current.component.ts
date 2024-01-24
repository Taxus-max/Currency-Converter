import { Component } from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";

interface currentExchangeRates{
  usdToEur: number,
  eurToUsd: number,
  usdTogbp: number,
  gbpTousd: number,
  eurTogbp: number,
  gbpToEur: number,
}

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
  currentExchangeRates: currentExchangeRates = {
    usdToEur: 0,
    eurToUsd: 0,
    usdTogbp: 0,
    gbpTousd: 0,
    eurTogbp: 0,
    gbpToEur: 0,
  }
}
