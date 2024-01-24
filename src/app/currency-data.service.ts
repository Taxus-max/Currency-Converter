import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {mergeMap, Subject} from "rxjs";

interface exchangeDetails{
  from: string,
  to: string,
  amount: number,
  amountMiddle: number,
  finalMiddleAmount: number,
  finalAmount: number
}

interface rateCurrencies{
  USD: number,
  EUR: number,
  JPY: number,
  AUD: number,
  GBP: number,
  CHF: number,
  CAD: number,
  HKD: number,
  NZD: number,
  CNH: number
}

interface httpConvertResponse {
  amount: number,
  date: string,
  from: string,
  meta: object,
  response: object,
  timestamp: number,
  to: string,
  value: number
}

interface httpConvertResponse {
  base: string,
  date: string,
  meta: object,
  rates: rateCurrencies,
  response: object,
}

@Injectable({
  providedIn: 'root'
})

export class CurrencyDataService {
  latestExchangeDetails: exchangeDetails = {
    from: '',
    to: '',
    amount: 0,
    finalAmount: 0,
    amountMiddle: 0,
    finalMiddleAmount: 0,
  };

  latestCurrencyRates: rateCurrencies = {
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
  }

  latestExchangeDetailsChange: Subject<exchangeDetails> = new Subject<exchangeDetails>();
  latestCurrencyRatesChange: Subject<rateCurrencies> = new Subject<rateCurrencies>();
  apiKey = "qbnMxJtvv96ANbGPENLHqKFh1U4KFMyT";

  constructor(private http: HttpClient) {
    this.latestExchangeDetailsChange.subscribe((value => {
      this.latestExchangeDetails = value
    }))
    this.latestCurrencyRatesChange.subscribe((value => {
      this.latestCurrencyRates = value
    }))
  }

  convertCurrency(amount: number, from: string, to: string){
    if(to === "EUR"){
      this.httpExchangeRequestEur(amount, from, to);
    }else{
      this.httpExchangeRequestNonEur(amount, from, to);
    }

    this.http.get<httpConvertResponse>('https://api.currencybeacon.com/v1/historical',{
      params: {
        api_key: this.apiKey,
        base: from,
        date: this.getDateForHistory(),
        symbols: "USD,EUR,JPY,AUD,GBP,CHF,CAD,HKD,NZD,CNH",
      },
      observe: 'body'
    }).subscribe((resp:httpConvertResponse) => this.setRates(resp.rates));

  }

  httpExchangeRequestEur(amount: number, from: string, to: string){
    this.http.get<httpConvertResponse>('https://api.currencybeacon.com/v1/convert',{
      params: {
        api_key: this.apiKey,
        from: from,
        to: to,
        amount: amount,
      },
      observe: 'body'
    }).subscribe((resp:httpConvertResponse) => {
        this.setResults({
          from: from,
          to: to,
          amount: amount,
          finalAmount: resp.value,
          amountMiddle: 0,
          finalMiddleAmount: 0,
        })
      })
  }

  httpExchangeRequestNonEur(amount: number, from: string, to: string){
    let finalMiddleAmount: number = 0;
    this.http.get<httpConvertResponse>('https://api.currencybeacon.com/v1/convert',{
      params: {
        api_key: this.apiKey,
        from: from,
        to: to,
        amount: amount,
      },
      observe: 'body'
    }).subscribe((resp:httpConvertResponse) => finalMiddleAmount = resp.value)

    this.http.get<httpConvertResponse>('https://api.currencybeacon.com/v1/convert',{
      params: {
        api_key: this.apiKey,
        from: from,
        to: "EUR",
        amount: amount,
      },
      observe: 'body'
    }).pipe(mergeMap((resp:httpConvertResponse) =>
      this.http.get<httpConvertResponse>('https://api.currencybeacon.com/v1/convert',{
        params: {
          api_key: this.apiKey,
          from: "EUR",
          to: to,
          amount: resp.value,
        },
        observe: 'body'
      })
    )).subscribe((resp:httpConvertResponse) => {
      this.setResults({
        from: from,
        to: to,
        amount: amount,
        finalAmount: resp.value,
        amountMiddle: resp.amount,
        finalMiddleAmount: finalMiddleAmount,
      })
    })
  }

  setResults(exchange: exchangeDetails){
    this.latestExchangeDetailsChange.next(this.latestExchangeDetails = {
      from: exchange.from,
      to: exchange.to,
      amount: exchange.amount,
      amountMiddle: exchange.amountMiddle,
      finalMiddleAmount: exchange.finalMiddleAmount,
      finalAmount: exchange.finalAmount
    });
  };

  setRates(rates: rateCurrencies){
    this.latestCurrencyRatesChange.next(this.latestCurrencyRates = rates);
  };

  getDateForHistory(){
    let date = new Date();
    date.setDate(date.getDate() -1 );
    return (date.toISOString().split('T')[0].toString());
  }

}
