import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/Base/ComponentBase';

@Component({
  selector: 'app-bonus-item',
  templateUrl: './bonus-item.component.html',
  styleUrls: ['./bonus-item.component.scss']
})
export class BonusItemComponent extends ComponentBase implements OnInit {

  @Input() freeSpin: any;
  @Input() selectedBet: any;
  @Input() nominaleMultiplier!: any;
  @Input() data: any;

  constructor(ref: ChangeDetectorRef) {
    super(ref);
  }

  ngOnInit(): void {
  }

  onClick() {
    this.emitAction('selectFreeSpin',
      {
        freeSpinType: this.freeSpin.typeID,
        bet: this.selectedBet,
        price: this.selectedBet * this.freeSpin.price,
        nominale: this.nominaleMultiplier.nominale,
        multiplier: this.nominaleMultiplier.multiplier,
        freeSpinCount: this.freeSpin.freeSpinCount
      }
    );
  }

  freeSpinName() {
    switch (this.freeSpin.typeID) {
      case 1: {
        return 'BIG BONUS'
      }
      case 2: {
        return 'SUPER BONUS'
      }
      case 3: {
        return 'MEGA BONUS'
      }
      default: {
        return '';
      }
    }
  }

}
