import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/Base/ComponentBase';

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
    this.emitAction(action, data);
  }

  getClass(id: number): string {
    return id === 1 ? 'big' : (id === 2 ? 'super' : 'mega');
  }

}
