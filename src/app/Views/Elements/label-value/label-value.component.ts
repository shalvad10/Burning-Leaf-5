import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/Base/ComponentBase';

@Component({
  selector: 'app-label-value',
  templateUrl: './label-value.component.html',
  styleUrls: ['./label-value.component.scss']
})
export class LabelValueComponent extends ComponentBase implements OnInit {

  constructor(private ref: ChangeDetectorRef) {
    super(ref);
  }

  public ammount: any = 0;
  public maxAmmount: any = 0;
  public step: number = 0.01;
  public int: any;
  public _isBonus!: boolean;

  @Input() hasAnimation!: boolean;
  @Input() isMobile: boolean = false;
  @Input() set spinning(val:boolean) {
    if (val) {
      this.stopAnimation();
    }
  }
  @Input() set clearAnimation(val:boolean) {
    if (val == false) {
      this.stopAnimation();
    }
  }
  @Input() set isBonus(val: any) {
    this._isBonus = val;
    if(val) {
      this.step = 0.05;
    }
  }
  @Input() label!: string;
  @Input() set value(val: any) {
    this.maxAmmount = 0;
    if (this.hasAnimation) {
      if(this._isBonus == false) { this.ammount = 0.00; }
      setTimeout(() => {
        if (val < this.ammount) this.ammount = 0; 
        this.maxAmmount = Number.parseFloat(val);
        
        if (this.maxAmmount - this.ammount <= 10) {
          this.step = 0.01;
        } else if (this.maxAmmount - this.ammount <= 50) {
          this.step = 0.1;
        } else if (this.maxAmmount - this.ammount <= 100) {
          this.step = 0.20;
        } else if (this.maxAmmount - this.ammount <= 500) {
          this.step = 1;
        } else if (this.maxAmmount - this.ammount <= 1000) {
          this.step = 10;
        } else if (this.maxAmmount - this.ammount <= 5000) {
          this.step = 50;
        } else if (this.maxAmmount - this.ammount > 5000) {
          this.step = 100;
        }
        this.emitAction('animatingAmmount', true);
        this.increaseValue(Number.parseFloat(val));
      }, 10);
    } else {
      this.ammount = val;
    }
  }

  public increaseValue(maxValue: number): void {
    this.int = setInterval( () => {
      if (this.ammount < maxValue) {
        this.ammount = ((this.ammount * 100) + (this.step * 100)) / 100;
      } else {
        this.stopAnimation();
      }
    },1);
  }

  stopAnimation(): void {
    clearInterval(this.int);
    this.ammount = this.maxAmmount;
    this.emitAction('animatingAmmount', false);
  }

  ngOnInit(): void { }

}
