import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/Base/ComponentBase';
import { Sounds } from 'src/app/Services/Libs/sounds';

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.scss']
})
export class ActionPanelComponent extends ComponentBase implements OnInit {

  public volume!: boolean;
  @Input() data: any;

  constructor(public ref: ChangeDetectorRef) {
    super(ref);
  }

  ngOnInit(): void {
    this.volume = Sounds.instance.volume>0 ? true : false;
  }

  toggleVolume(): void {
    this.volume = !this.volume;
    this.emitAction('toggleVolume', this.volume ? 1 : 0);
  }

  public get selectedBet(): number {
    return this.data.game.selectedBet;
  }
  public get gameLine(): number {
    return this.data.game.gameLine;
  }
  public get isBonus(): boolean {
    return this.data.game.freeSpins.count >= 0;
  }
  public get betMultipliers(): number[] {
    return this.data.game.betMultipliers;
  }
  public get selectedNominale(): number {
    return this.data.game.selectedNominale;
  }

  public bet(betMultiplier:number) {
    return betMultiplier * this.gameLine * this.selectedNominale;
  }

  gameInfo(tab: any): void {
    this.data.modal.currentModal = 'game_info';
    const modal = this.data.modal.modalParams[this.data.modal.currentModal];
    if (tab !== null) {
      modal.activeTab = tab;
    }
  }

  fullScreen(): void {
    var targetelement: any = document.getElementsByTagName('body')[0];
  
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      if (targetelement.requestFullscreen)
      {
        targetelement.requestFullscreen();
      }
      if (targetelement.webkitRequestFullscreen)
      {
        targetelement.webkitRequestFullscreen();
      }
      if (targetelement.mozRequestFullScreen)
      {
        targetelement.mozRequestFullScreen();
      }
      if (targetelement.msRequestFullscreen)
      {
        targetelement.msRequestFullscreen();
      }
    }

  }

  public wonAmmount() {
    return this.data.game.freeSpins.won > 0 ? this.data.game.freeSpins.won : this.data.game.wonAmmount;
  }

  public get balance(): string {
    return this.data.user.balance;
  }
}
