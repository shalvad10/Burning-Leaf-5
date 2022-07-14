import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/Base/ComponentBase';
import { Sounds } from 'src/app/Services/Libs/sounds';

@Component({
  selector: 'app-bonus-type',
  templateUrl: './bonus-type.component.html',
  styleUrls: ['./bonus-type.component.scss']
})
export class BonusTypeComponent extends ComponentBase implements OnInit {

  constructor(private ref: ChangeDetectorRef) {
    super(ref);
  }

  @Input() data: any;

  public buttons = [];

  ngOnInit(): void {
    if (this.data.data.firstBuy == false) {
      this.buttons = this.data.buttons.filter( (btn: any) => btn.text !== 'CANCEL');
    } else {
      this.buttons = this.data.buttons;
    }
  }

  onClick(action: boolean): void {
    if (this.data.data.firstBuy == true) {
      if (action) {
        this.emitAction('autoSpin', {inProgress: true, spinsCount: this.data.data.freespinsCount});
        Sounds.instance.play('bonus_started');
        this.emitAction('buyFreeSpin', true);
      }else {
        this.emitAction('buyFreeSpin', false);
      }
      this.emitAction('toggleModal', {modal: ''});
    } else {
      this.emitAction('autoSpin', {inProgress: true, spinsCount: this.data.data.freespinsCount});
      Sounds.instance.play('bonus_started');
      this.emitAction('toggleModal', {modal: ''});
    }
  }

  getClass(id: number): string {
    return id === 1 ? 'big' : (id === 2 ? 'super' : 'mega');
  }

}
