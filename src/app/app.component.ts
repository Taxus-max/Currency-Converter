import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {ExchangeComponent} from "./exchange/exchange.component";
import {ExchangeDetailsComponent} from "./exchange-details/exchange-details.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatGridList,
    MatGridTile,
    ExchangeComponent,
    ExchangeDetailsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'currency-converter';
}
