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

  public stages = [
    {
      pos: 1, label: 'Open', color: 'green'
    },
    {
      pos: 2, label: 'In Progress', color: 'yellow'
    },
    {
      pos: 3, label: 'Closed', color: 'blue'
    },
  ];

  constructor() { }

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.paginationEnabled = false;
    this.configuration.rowReorder = true;

    this.columns = [
      { key: 'pos', title: 'Pos', orderEnabled: false },
      { key: 'label', title: 'Label', orderEnabled: false },
      { key: 'color', title: 'Color', orderEnabled: false },
    ];
  }

}
