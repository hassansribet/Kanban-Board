import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  tasks = [1, 2, 3, 4, 5, 6];
  constructor() { }

  ngOnInit(): void {
  }

}
