import { Component } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import worldCurrencies from "../../assets/currency_symbol.json"
import {CurrencyDataService} from "../currency-data.service";
import { currency } from "../interfaces/interfaces";

@Component({
  selector: 'app-exchange',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatGridTile,
    MatGridList
  ],
  templateUrl: './exchange.component.html',
  styleUrl: './exchange.component.css'
})

export class ExchangeComponent {
  constructor(private currencyDataService: CurrencyDataService) { }
  currencies: currency[]= worldCurrencies;
  currencyFrom: string = "HUF";
  currencyTo: string = "";

  convertButtonClick(moneyStartingAmount: string){
    if (this.currencyFrom === this.currencyTo) {
      alert("Please select two different currencies!");
      return;
    }
    if (Number(moneyStartingAmount) === 0){
      alert("Please define amount to exchange!");
      return;
    }
    if (this.currencyTo === ""){
      alert("Please select the the currency to convert!");
      return;
    }

    this.currencyDataService.convertCurrency(Number(moneyStartingAmount), this.currencyFrom, this.currencyTo)
  };

  getCurrencySymbol(currencyCode: string){
      return this.currencies.find(currency => {
        return currency.Code === currencyCode
      })!.Symbol
  };
}
