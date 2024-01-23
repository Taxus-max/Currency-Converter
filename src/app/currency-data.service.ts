import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

interface exchangeDetails{
  from: string,
  to: string,
  amount: number,
  amountMiddle?: number,
  finalMiddleAmount?: number,
  finalAmount: number
}

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

@Injectable({
  providedIn: 'root'
})

export class CurrencyDataService {
  latestExchangeDetails: exchangeDetails = {
    from: '',
    to: '',
    amount: 0,
    finalAmount: 0
  };
  latestCurrencyRates: rateCurrencies = {
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

  latestExchangeDetailsChange: Subject<exchangeDetails> = new Subject<exchangeDetails>();
  latestCurrencyRatesChange: Subject<rateCurrencies> = new Subject<rateCurrencies>();

  constructor() {
    this.latestExchangeDetailsChange.subscribe((value => {
      this.latestExchangeDetails = value
    }))
    this.latestCurrencyRatesChange.subscribe((value => {
      this.latestCurrencyRates = value
    }))
  }

  convertCurrency(amount: number, from: string, to: string){
    if(to === "EUR"){
      //Exchange from - to
      //Return only the final amount
    }else{
      //Exchange from - eur - to
      //Return amount after both steps
    }

    //get rate history for the selected cur

    this.latestExchangeDetailsChange.next(this.latestExchangeDetails = {
      from: from,
      to: to,
      amount: amount,
      finalAmount: 10400
    });

    this.latestCurrencyRatesChange.next(this.latestCurrencyRates = {
      USD: 120,
      EUR: 313,
      YEN: 123,
      AUD: 123123,
      GBP: 12,
      CHF: 123123,
      CAD: 12313,
      HKD: 0,
      NZD: 0,
      CNH: 0
    });
  }

}
