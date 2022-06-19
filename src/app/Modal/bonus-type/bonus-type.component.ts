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

  ngOnInit(): void { }

  onClick(action: string, data: any): void {
    this.emitAction('toggleModal', {modal: ''});
    this.emitAction('autoSpin', {inProgress: true, spinsCount: this.data.data.freespinsCount});
    Sounds.instance.play('bonus_started');
  }

  getClass(id: number): string {
    return id === 1 ? 'big' : (id === 2 ? 'super' : 'mega');
  }

}
