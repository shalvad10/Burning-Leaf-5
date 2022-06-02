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

  constructor(private ref: ChangeDetectorRef) {
    super(ref);
  }

  ngOnInit(): void {
  }

  onClick() {
    this.emitAction('buyFreeSpin', {freeSpinType: this.freeSpin.id});
  }

}
