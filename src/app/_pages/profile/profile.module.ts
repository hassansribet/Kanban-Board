import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { CustomBoardComponent } from './settings/custom-board/custom-board.component';
import { TableModule } from 'ngx-easy-table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [CustomBoardComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    TableModule,
    DragDropModule,
    NgxSmartModalModule.forRoot(),
    FormsModule
  ]
})
export class ProfileModule { }
