import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './_layouts/nav-bar/nav-bar.component';
import { BoardComponent } from './_pages/projects/board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
