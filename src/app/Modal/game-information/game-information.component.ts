import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-information',
  templateUrl: './game-information.component.html',
  styleUrls: ['./game-information.component.scss']
})
export class GameInformationComponent implements OnInit {

  constructor() { }

  selectedTab: string = 'info';

  ngOnInit(): void {
  }

  selectTab(tab: any): void {
    this.selectedTab = tab == null ? this.selectedTab : tab;
  }

}
