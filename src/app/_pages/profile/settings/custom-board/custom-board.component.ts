import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Stage } from '../../../../_shared/models/stage.model';
import { StageService } from '../../../../_shared/services/stage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-custom-board',
  templateUrl: './custom-board.component.html',
  styleUrls: ['./custom-board.component.scss']
})
export class CustomBoardComponent implements OnInit  {
  loading = false;
  stage: Stage;
  newStage = false;
  pos = 0;
  initialStages: Stage[] = [];
  stages: Stage[] = [];
  errors = [];
  colors = ['#2ed573', '#ffa502', '#1e90ff', '#485460', '#f53b57', '#575fcf'];

  constructor(
    public modal: NgxSmartModalService,
    private stageService: StageService,
    private toast: ToastrService,
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
    }, () => {
      this.onError();
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
          this.pos = this.stage.pos;
          this.modal.open('stageModal');
        } else {
          this.onWarning('Maximum 6 Stages', 'Stages limit');
        }
        break;
      case 'edit':
        this.newStage = false;
        this.stage = {...this.stages[pos]};
        this.pos = this.stage.pos;
        this.modal.open('stageModal');
        break;
      default:
        break;
    }
  }

  deleteStage(id: string): void {
    if (confirm('Aer you sure ?')) {
      this.stageService.delete(id)
        .then(() => {
          this.onSuccess('Stage deleted successfully!', 'Delete Stage');
          this.saveChanges();
        })
        .catch(() => {
          this.onError();
        });
    }
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
        this.stageService.create({
          pos: this.stage.pos,
          label: this.stage.label,
          color: this.stage.color
        })
          .then(() => {
            this.onSuccess('Stage added successfully!', 'Add Stage');
          })
          .catch(() => {
            this.onError();
          });
      } else {
        this.stageService.update(this.stage)
          .then(() => {
            this.onSuccess('Stage updated successfully!', 'Update Stage');
          })
          .catch(() => {
            this.onError();
          });
      }
    }
  }

  onSuccess(message: string, title: string): void {
    this.toast.success(message, title);
  }

  onWarning(message: string, title: string): void {
    this.toast.warning(message, title);
  }

  onError(): void {
    this.toast.error('Sorry, try later!', 'Error');
  }

  why(): void {
    this.stage.pos = this.pos;
    this.onWarning('why you do this :(', 'Why');
  }
}
