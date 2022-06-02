import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/Base/ComponentBase';

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.scss']
})
export class ActionPanelComponent extends ComponentBase implements OnInit {

  public volume: boolean = true;
  @Input() data: any;

  constructor(public ref: ChangeDetectorRef) {
    super(ref);
  }

  ngOnInit(): void { }

  toggleVolume(): void {
    this.volume = !this.volume;
  }

  public get selectedBet(): number {
    return this.data.game.selectedBet;
  }
  public get gameLine(): number {
    return this.data.game.gameLine;
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
  
  
  public get balance(): string {
    return this.data.user.balance.toString();
  }

}
