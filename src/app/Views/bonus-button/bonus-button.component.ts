import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/Base/ComponentBase';

@Component({
  selector: 'app-bonus-button',
  templateUrl: './bonus-button.component.html',
  styleUrls: ['./bonus-button.component.scss']
})
export class BonusButtonComponent extends ComponentBase implements OnInit {

  @Input() freeSpins!: number;

  constructor(private ref: ChangeDetectorRef) {
    super(ref);
  }

  ngOnInit(): void { }

  onClick() {
    if (this.freeSpins == 0) {
      this.emitAction('toggleModal', {modal: 'bonus', data: undefined});
    }
  }

}
