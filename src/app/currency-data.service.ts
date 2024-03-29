import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {mergeMap, Subject} from "rxjs";
import {
  exchangeDetails,
  rateCurrencies,
  httpConvertResponse,
  httpRateResponse,
  httpCurrentResponse,
  currentExchangeRates
} from "./interfaces/interfaces";

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

  convertCurrency(amount: number, from: string, to: string): void {
    if (from ==="HUF" && to !== "EUR") {
      this.httpExchangeRequestNonEur(amount, from, to);
    } else {
      this.httpExchangeRequestEur(amount, from, to);
    }

    this.http.get<httpRateResponse>('https://api.currencybeacon.com/v1/historical', {
      params: {
        api_key: this.apiKey,
        base: from,
        date: this.getDateForHistory(),
        symbols: "USD,EUR,JPY,AUD,GBP,CHF,CAD,HKD,NZD,CNH",
      },
      observe: 'body'
    }).subscribe((resp: httpRateResponse) => this.setRates(resp.rates));

  }

  httpExchangeRequestEur(amount: number, from: string, to: string): void {
    this.http.get<httpConvertResponse>('https://api.currencybeacon.com/v1/convert', {
      params: {
        api_key: this.apiKey,
        from: from,
        to: to,
        amount: amount,
      },
      observe: 'body'
    }).subscribe((resp: httpConvertResponse) => {
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

  httpExchangeRequestNonEur(amount: number, from: string, to: string): void {
    let finalMiddleAmount: number = 0;
    this.http.get<httpConvertResponse>('https://api.currencybeacon.com/v1/convert', {
      params: {
        api_key: this.apiKey,
        from: from,
        to: to,
        amount: amount,
      },
      observe: 'body'
    }).subscribe((resp: httpConvertResponse) => finalMiddleAmount = resp.value)

    this.http.get<httpConvertResponse>('https://api.currencybeacon.com/v1/convert', {
      params: {
        api_key: this.apiKey,
        from: from,
        to: "EUR",
        amount: amount,
      },
      observe: 'body'
    }).pipe(mergeMap((resp: httpConvertResponse) =>
      this.http.get<httpConvertResponse>('https://api.currencybeacon.com/v1/convert', {
        params: {
          api_key: this.apiKey,
          from: "EUR",
          to: to,
          amount: resp.value,
        },
        observe: 'body'
      })
    )).subscribe((resp: httpConvertResponse) => {
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

  setResults(exchange: exchangeDetails): void {
    this.latestExchangeDetailsChange.next(this.latestExchangeDetails = exchange);
  };

  setRates(rates: rateCurrencies): void {
    this.latestCurrencyRatesChange.next(this.latestCurrencyRates = rates);
  };

  getDateForHistory(): string {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return (date.toISOString().split('T')[0].toString());
  }

  getCurrentRates(): currentExchangeRates {
    let currentRates: currentExchangeRates = {
      usdToEur: 0,
      eurToUsd: 0,
      usdTogbp: 0,
      gbpTousd: 0,
      eurTogbp: 0,
      gbpToEur: 0,
    }

    this.http.get<httpCurrentResponse>('https://api.currencybeacon.com/v1/latest',{
      params: {
        api_key: this.apiKey,
        base: "USD",
        symbols : "EUR,GBP",
      },
      observe: 'body'
    }).subscribe(resp => {
      currentRates.usdToEur = resp.rates.EUR!
      currentRates.usdTogbp = resp.rates.GBP!
      })

    this.http.get<httpCurrentResponse>('https://api.currencybeacon.com/v1/latest',{
      params: {
        api_key: this.apiKey,
        base: "EUR",
        symbols : "USD,GBP",
      },
      observe: 'body'
    }).subscribe(resp => {
      currentRates.eurToUsd = resp.rates.USD!
      currentRates.eurTogbp= resp.rates.GBP!
    })

    this.http.get<httpCurrentResponse>('https://api.currencybeacon.com/v1/latest',{
      params: {
        api_key: this.apiKey,
        base: "GBP",
        symbols : "USD,EUR",
      },
      observe: 'body'
    }).subscribe(resp => {
      currentRates.gbpToEur = resp.rates.EUR!
      currentRates.gbpTousd= resp.rates.USD!
    })

    return currentRates;
  }
}
