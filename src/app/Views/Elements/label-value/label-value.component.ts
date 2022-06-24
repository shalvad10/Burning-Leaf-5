import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-label-value',
  templateUrl: './label-value.component.html',
  styleUrls: ['./label-value.component.scss']
})
export class LabelValueComponent implements OnInit {

  constructor() { }

  public ammount: any = 0;
  public maxAmmount: any = 0;
  public step: number = 0.01;
  public int: any;

  @Input() hasAnimation!: boolean;
  @Input() set spinning(val:boolean) {
    console.warn('AAAAAAAAAAAQQQQQQQQQQ', val)
    if (val) {
      clearInterval(this.int);
      this.ammount = this.maxAmmount;
    }
  }
  @Input() isBonus!: boolean;
  @Input() label!: string;
  @Input() set value(val: any) {
    this.maxAmmount = 0;
    if (this.hasAnimation) {
      if(this.isBonus == false) { this.ammount = 0.00; }
      setTimeout(() => {
        if (val < this.ammount) this.ammount = 0; 
        this.maxAmmount = Number.parseFloat(val);
        this.increaseValue(Number.parseFloat(val));
      }, 10);
    } else {
      this.ammount = Number.parseFloat(val);
    }
  }

  public increaseValue(maxValue: number): void {
    this.int = setInterval( () => {
      if (this.ammount < maxValue) {
        this.ammount = ((this.ammount * 100) + (this.step * 100)) / 100;
      } else {
        clearInterval(this.int);
      }
    },5);
  }

  ngOnInit(): void { }

}
