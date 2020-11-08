import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Stage } from '../../../../_shared/models/stage.model';
import { StageService } from '../../../../_shared/services/stage.service';

@Component({
  selector: 'app-custom-board',
  templateUrl: './custom-board.component.html',
  styleUrls: ['./custom-board.component.scss']
})
export class CustomBoardComponent implements OnInit  {
  loading = false;
  stage: Stage;
  newStage = false;
  initialStages: Stage[] = [];
  stages: Stage[] = [];
  errors = [];
  colors = ['#2ed573', '#ffa502', '#1e90ff', '#485460', '#f53b57', '#575fcf'];

  constructor(
    public modal: NgxSmartModalService,
    private stageService: StageService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.stageService.getAll().subscribe(data => {
      this.stages = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Stage;
      });
      this.loading = false;
      this.initialStages = [...this.stages];
    }, error => {
      // TODO show error message
    });
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.stages, event.previousIndex, event.currentIndex);
  }

  checkChanges(): boolean {
    let changed = false;
    if (this.stages.length > 0 && !this.loading) {
      this.stages.forEach((s, i) => {
        if (s.pos !== this.initialStages[i].pos) {
          changed = true;
        }
      });
    }
    return changed;
  }

  openStageModal(typeOfAction: string, pos?: number): void {
    switch (typeOfAction) {
      case 'new':
        if (this.stages.length < 6) {
          this.newStage = true;
          this.stage = new Stage(this.stages.length + 1, '');
          this.modal.open('stageModal');
        } else {
          // TODO show error message
          console.log('maximum 6 stages');
        }
        break;
      case 'edit':
        this.newStage = false;
        this.stage = {...this.stages[pos]};
        this.modal.open('stageModal');
        break;
      default:
        break;
    }
  }

  deleteStage(id: string): void {
    this.stageService.delete(id)
      .then(res => {
        // TODO show confirmation message
      })
      .catch(err => {
        // TODO show error message
      });
  }

  cancelChanges(): void {
    this.stages = [...this.initialStages];
  }

  saveChanges(): void {
    this.stages.forEach((s, index) => {
      s.pos = index + 1;
      this.stageService.update(s).then();
    });
  }

  modalClosed(): void {
    console.log('modal closed successfully!');
  }

  closeModal(action: string): void {
    this.modal.close('stageModal');
    if (action === 'save') {
      if (this.newStage) {
        console.log(this.stage);
        this.stageService.create({
          pos: this.stage.pos,
          label: this.stage.label,
          color: this.stage.color
        })
          .then(res => {
            // TODO show confirmation message
          })
          .catch(err => {
            // TODO show error message
          });
      } else {
        this.stageService.update(this.stage)
          .then(res => {
            // TODO show confirmation message
          })
          .catch(err => {
            // TODO show error message
          });
      }
    }
  }

  why(): void {
    // TODO show error message
    console.log('why you do this :(');
  }
}
