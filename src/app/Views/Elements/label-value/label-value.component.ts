import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-label-value',
  templateUrl: './label-value.component.html',
  styleUrls: ['./label-value.component.scss']
})
export class LabelValueComponent implements OnInit {

  constructor() { }

  public _value: string = '0';
  @Input() label!: string;
  @Input() set value(val: any) {
    this._value = Number.parseFloat(val).toFixed(2),this._value;
    console.warn(val);
    // if (Number.parseInt(this._value) == 0) {
    //   this.animateValue(this._value,Number.parseFloat(val).toFixed(2),1000);
    // } else {
    //   this.animateValue(Number.parseFloat(val).toFixed(2),this._value,1000);
    // }
  }


  ngOnInit(): void { }

  // animateValue(start: any, end: any, duration: any) {
  //   let startTimestamp: any = null;
  //   const step = (timestamp: any) => {
  //     if (!startTimestamp) startTimestamp = timestamp;
  //     const progress = Math.min((timestamp - startTimestamp) / duration, 1);
  //     this._value = Number.parseFloat(progress * (end - start) + start).toFixed(2);
  //     if (progress < 1) {
  //       window.requestAnimationFrame(step);
  //     }
  //   };
  //   window.requestAnimationFrame(step);
  // }

}
