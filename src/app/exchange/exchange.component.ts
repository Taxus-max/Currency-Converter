import { Component } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";

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

}
