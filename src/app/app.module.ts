import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './_layouts/nav-bar/nav-bar.component';
import { BoardComponent } from './_pages/projects/board/board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SettingsComponent } from './_pages/profile/settings/settings.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    BoardComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
