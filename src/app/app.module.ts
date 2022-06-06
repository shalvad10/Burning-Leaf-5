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
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './Modal/modal.component';
import { BuyFreespinsComponent } from './Modal/buy-freespins/buy-freespins.component';
import { BonusItemComponent } from './Views/Elements/bonus-item/bonus-item.component';
import { BonusBetComponent } from './Views/Elements/bonus-bet/bonus-bet.component';
import { InfoComponent } from './Modal/info/info.component';
import { BonusTypeComponent } from './Modal/bonus-type/bonus-type.component';
import { BonusWinComponent } from './Modal/bonus-win/bonus-win.component';

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
    NominalesSelectorComponent,
    ModalComponent,
    BuyFreespinsComponent,
    BonusItemComponent,
    BonusBetComponent,
    InfoComponent,
    BonusTypeComponent,
    BonusWinComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
