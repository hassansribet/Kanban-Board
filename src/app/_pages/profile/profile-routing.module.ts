import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import {CustomBoardComponent} from './settings/custom-board/custom-board.component';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      { path: '', redirectTo: 'custom-board', pathMatch: 'full' },
      { path: 'custom-board', component: CustomBoardComponent, }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
