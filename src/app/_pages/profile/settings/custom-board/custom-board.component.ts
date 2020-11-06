import { Component, OnInit } from '@angular/core';
import {Columns, Config, DefaultConfig} from 'ngx-easy-table';

@Component({
  selector: 'app-custom-board',
  templateUrl: './custom-board.component.html',
  styleUrls: ['./custom-board.component.scss']
})
export class CustomBoardComponent implements OnInit {
  public configuration: Config;
  public columns: Columns[];

  public stages = [];

  constructor() { }

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.paginationEnabled = false;

    this.columns = [
      { key: 'pos', title: 'Pos' },
      { key: 'label', title: 'Label' },
      { key: 'color', title: 'Color' },
    ];
  }

}
