import { Component } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import worldCurrencies from "../../assets/currency_symbol.json"

interface currency {
  Flag: string,
  CountryName: string,
  Currency: string,
  Code: string,
  Symbol: string
}

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
  currencies: currency[]= worldCurrencies;
  currencyFrom: string = "HUF";
  currencyTo: string = "";

  convertButtonClick(moneyStartingAmount: string){
    if (this.currencyFrom === this.currencyTo) {
      alert("Please select two different currencies!")
      return;
    }
    if (Number(moneyStartingAmount) === 0){
      alert("Please define amount to exchange!")
      return;
    }
    if (this.currencyTo === ""){
      alert("Please select the the currency to convert!")
      return;
    }

  };
}
