import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/Base/ComponentBase';

@Component({
  selector: 'app-bonus-win',
  templateUrl: './bonus-win.component.html',
  styleUrls: ['./bonus-win.component.scss']
})
export class BonusWinComponent  extends ComponentBase implements OnInit {

  constructor(private ref: ChangeDetectorRef) {
    super(ref);
  }

  public _data: any;
  public ammount: any;

  @Input() set data(val: any) {
    this._data = val;
    this.animateValue(0, val.ammount.toFixed(2), 3000);
  }

  ngOnInit(): void { }

  onClick(action: string, data: any): void {
    this.emitAction(action, data);
  }

  getClass(id: number): string {
    return id === 1 ? 'big' : (id === 2 ? 'super' : 'mega');
  }

  
  animateValue(start: any, end: any, duration: any) {
    let startTimestamp: any = null;
    const step = (timestamp: any) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      this.ammount = Number.parseFloat(progress * (end - start) + start).toFixed(2);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

}
