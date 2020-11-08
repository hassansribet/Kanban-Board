import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { StageService } from '../../../_shared/services/stage.service';
import { Stage } from '../../../_shared/models/stage.model';
import { Task } from 'src/app/_shared/models/task.model';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  loading = false;
  stages: Stage[] = [];

  constructor(
    private stageService: StageService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.stageService.getAll().subscribe(data => {
      this.stages = data.map(e => {
        return {
          id: e.payload.doc.id,
          tasks: [],
          ...e.payload.doc.data()
        } as Stage;
      });
      this.loading = false;
      this.stages[0].tasks.push({
        id: 'adadazd',
        label: 'task 01'
      });
      this.stages[0].tasks.push({
        id: 'adadazd',
        label: 'task 02'
      });
      this.stages[0].tasks.push({
        id: 'adadazd',
        label: 'task 03'
      });
    }, error => {
      // this.onError();
    });
  }

  drop(event: CdkDragDrop<Task[], any>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        0
      );
    }
  }

}
