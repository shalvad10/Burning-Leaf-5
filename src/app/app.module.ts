import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameContainerComponent } from './Views/game-container/game-container.component';
import { GameComponent } from './Views/game/game.component';
import { LinesComponent } from './Views/lines/lines.component';
import { BonusButtonComponent } from './Views/bonus-button/bonus-button.component';
import { ActionPanelComponent } from './Views/action-panel/action-panel.component';
import { LabelValueComponent } from './Views/Elements/label-value/label-value.component';
import { CounterComponent } from './Views/Elements/counter/counter.component';
import { DropdownComponent } from './Views/Elements/dropdown/dropdown.component';
import { BetBlockComponent } from './Views/Elements/bet-block/bet-block.component';
import { NominalesSelectorComponent } from './Views/Elements/nominales-selector/nominales-selector.component';

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
