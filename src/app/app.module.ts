import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameContainerComponent } from './game-container/game-container.component';
import { GameComponent } from './game/game.component';
import { LinesComponent } from './lines/lines.component';
import { BonusButtonComponent } from './bonus-button/bonus-button.component';
import { ActionPanelComponent } from './action-panel/action-panel.component';
import { LabelValueComponent } from './Elements/label-value/label-value.component';
import { CounterComponent } from './Elements/counter/counter.component';
import { DropdownComponent } from './Elements/dropdown/dropdown.component';
import { BetBlockComponent } from './Elements/bet-block/bet-block.component';
import { NominalesSelectorComponent } from './Elements/nominales-selector/nominales-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    GameContainerComponent,
    GameComponent,
    LinesComponent,
    BonusButtonComponent,
    ActionPanelComponent,
    LabelValueComponent,
    CounterComponent,
    DropdownComponent,
    BetBlockComponent,
    NominalesSelectorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
