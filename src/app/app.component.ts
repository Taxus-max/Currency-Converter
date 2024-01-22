import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatGridList,
    MatGridTile,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'currency-converter';
}
