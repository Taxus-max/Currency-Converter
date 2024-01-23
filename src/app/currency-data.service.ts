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
  latestExchangeDetailsChange: Subject<exchangeDetails> = new Subject<exchangeDetails>();

  constructor() {
    this.latestExchangeDetailsChange.subscribe((value => {
      this.latestExchangeDetails = value
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

    this.latestExchangeDetailsChange.next(this.latestExchangeDetails = {
      from: from,
      to: to,
      amount: amount,
      finalAmount: 10400
    });
  }

}
