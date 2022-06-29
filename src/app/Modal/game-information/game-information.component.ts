import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-information',
  templateUrl: './game-information.component.html',
  styleUrls: ['./game-information.component.scss']
})
export class GameInformationComponent implements OnInit {

  constructor() { }

  selectedTab: string = 'info';
  @Input() data!: any;
  @Input() selectedBet: any;

  ngOnInit(): void {
    setTimeout(() => {
      console.warn(this.selectedBet, Number.parseFloat(this.selectedBet));
    }, 2000);
  }

  selectTab(tab: any): void {
    this.selectedTab = tab == null ? this.selectedTab : tab;
  }

  public get groupItems() {
    return this.data ? this.data.filter( (item: any) => item.group == true ) : [];
  }

  public returnX(mult: any, divide:boolean = true) {
    return divide ? (Number.parseFloat(this.selectedBet) / 5)* Number.parseInt(mult) : Number.parseFloat(this.selectedBet) * Number.parseInt(mult);
  }

  public get bell() {
    return this.data ? this.data.filter( (item: any) => item.symbol == 'bell' )[0] : [];
  }

  public get grapes() {
    return this.data ? this.data.filter( (item: any) => item.symbol == 'grapes' )[0] : [];
  }

  public get seven() {
    return this.data ? this.data.filter( (item: any) => item.symbol == 'seven' )[0] : [];
  }

  public get wintry() {
    return this.data ? this.data.filter( (item: any) => item.symbol == 'wintry' )[0] : [];
  }

  public get star() {
    return this.data ? this.data.filter( (item: any) => item.symbol == 'star' )[0] : [];
  }

  public get dollar() {
    return this.data ? this.data.filter( (item: any) => item.symbol == 'dollar' )[0] : [];
  }
}
