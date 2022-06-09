import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/Base/ComponentBase';

@Component({
  selector: 'app-bet-block',
  templateUrl: './bet-block.component.html',
  styleUrls: ['./bet-block.component.scss']
})
export class BetBlockComponent extends ComponentBase implements OnInit {

  @Input() currency!: string;
  @Input() spinning!: boolean;
  @Input() value: any;
  @Input() index!: number;
  @Input() isSelected!: boolean;

  constructor(public ref: ChangeDetectorRef) {
    super(ref);
  }

  selectBet() {
    if (this.spinning == false) {
      this.emitAction('selectBet', { bet: this.value, index: this.index});
    } else {
      this.emitAction('stopSpin', {});
    }
  }

  transformText() {
    return this.spinning ? 'STOP' : (this.value >= 100 ? this.value : this.value.toFixed(2));
  }

  ngOnInit(): void { }

}
