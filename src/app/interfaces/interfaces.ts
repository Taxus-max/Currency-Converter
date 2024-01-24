export interface exchangeDetails{
  from: string,
  to: string,
  amount: number,
  amountMiddle: number,
  finalMiddleAmount: number,
  finalAmount: number
}

export interface rateCurrencies{
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

export interface httpConvertResponse {
  amount: number,
  date: string,
  from: string,
  meta: object,
  response: object,
  timestamp: number,
  to: string,
  value: number
}

export interface httpRateResponse {
  base: string,
  date: string,
  meta: object,
  rates: rateCurrencies,
  response: object,
}

export interface httpCurrentResponse {
  base: string,
  date: string,
  meta: object,
  rates: {
    EUR?: number,
    GBP?: number,
    USD?: number
  },
  response: object,
}

export interface currentExchangeRates{
  usdToEur: number,
  eurToUsd: number,
  usdTogbp: number,
  gbpTousd: number,
  eurTogbp: number,
  gbpToEur: number,
}

export interface currency {
  Flag: string,
  CountryName: string,
  Currency: string,
  Code: string,
  Symbol: string
}
