import { Component } from '@angular/core';
import { CurrencyDataService } from '../currency-data.service'
import {NgIf} from "@angular/common";
import { exchangeDetails } from "../interfaces/interfaces";

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
    finalAmount: 0,
    amountMiddle: 0,
    finalMiddleAmount: 0,
  };
}
