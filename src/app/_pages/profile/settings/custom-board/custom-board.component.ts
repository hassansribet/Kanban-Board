import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Stage } from '../../../../_shares/models/stage.model';

@Component({
  selector: 'app-custom-board',
  templateUrl: './custom-board.component.html',
  styleUrls: ['./custom-board.component.scss']
})
export class CustomBoardComponent implements OnInit  {
  stage: Stage;
  newStage = false;
  initialStages: Stage[] = [];
  stages: Stage[] = [
    {
      pos: 1, label: 'Open', color: '#2ed573'
    },
    {
      pos: 2, label: 'In Progress', color: '#ffa502'
    },
    {
      pos: 3, label: 'Closed', color: '#1e90ff'
    },
    {
      pos: 4, label: 'Closed', color: 'blue'
    },
    {
      pos: 5, label: 'Closed', color: 'blue'
    },
    {
      pos: 6, label: 'Closed', color: 'blue'
    }
  ];
  colors = ['#2ed573', '#ffa502', '#1e90ff', '#485460', '#f53b57', '#0fbcf9'];

  constructor(public modal: NgxSmartModalService) {
  }

  ngOnInit(): void {
    this.initialStages = [...this.stages];
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.stages, event.previousIndex, event.currentIndex);
  }

  checkChanges(): boolean {
    let changed = false;
    this.stages.forEach((s, i) => {
      if (s.pos !== this.initialStages[i].pos) {
        changed = true;
      }
    });
    return changed;
  }

  openStageModal(typeOfAction: string, pos?: number): void {

    switch (typeOfAction) {
      case 'new':
        if (this.stages.length < 6) {
          this.stage = new Stage(this.stages.length + 1, '');
          console.log(typeOfAction, this.stage);
          this.modal.open('stageModal');
        } else {
          // TODO show error message
          console.log('maximum 6 stages');
        }
        break;
      case 'edit':
        this.stage = {...this.stages[pos]};
        console.log(typeOfAction, this.stage);
        this.modal.open('stageModal');
        break;
      default:
        break;
    }
  }

  deleteStage(pos: number): void {
    console.log('delete => ' + pos);
  }

  cancelChanges(): void {
    this.stages = [...this.initialStages];
  }

  saveChanges(): void {
    console.log('save changes');
  }

  modalClosed(): void {
    console.log('modal closed successfully!');
  }

  closeModal(action: string): void {
    this.modal.close('stageModal');
    if (action === 'save') {
      if (this.newStage) {
        console.log('add new stage');
      } else {
        console.log('update stage');
      }
    }
  }


  why(): void {
    console.log('why you do this :(');
  }
}
