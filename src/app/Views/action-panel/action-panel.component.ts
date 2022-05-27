import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.scss']
})
export class ActionPanelComponent implements OnInit {

  public volume: boolean = true;

  public nominales = [0.03,0.5,1,2,3];
  public selectedNominale = 0.5;

  @Input() data: any;
  constructor() { }

  ngOnInit(): void { }

  toggleVolume(): void {
    this.volume = !this.volume;
  }

  selectNominale(nominale: number) {
    this.selectedNominale = nominale;
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
