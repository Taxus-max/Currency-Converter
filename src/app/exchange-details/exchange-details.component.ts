import { Component } from '@angular/core';
import { CurrencyDataService } from '../currency-data.service'
import {NgIf} from "@angular/common";

interface exchangeDetails{
  from: string,
  to: string,
  amount: number,
  amountMiddle?: number,
  finalMiddleAmount?: number,
  finalAmount: number
}

@Component({
  selector: 'app-exchange-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './exchange-details.component.html',
  styleUrl: './exchange-details.component.css'
})

export class ExchangeDetailsComponent {
  constructor(private currencyDataService: CurrencyDataService) {
    this.currencyDataService.latestExchangeDetailsChange.subscribe(value => {
      this.exchangeDetails = value;
    })
  }

  exchangeDetails: exchangeDetails = {
    from: '',
    to: '',
    amount: 0,
    finalAmount: 0
  };
}
