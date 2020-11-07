import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { CustomBoardComponent } from './settings/custom-board/custom-board.component';
import { TableModule } from 'ngx-easy-table';


@NgModule({
  declarations: [CustomBoardComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    TableModule
  ]
})
export class ProfileModule { }
