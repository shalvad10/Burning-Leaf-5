import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-label-value',
  templateUrl: './label-value.component.html',
  styleUrls: ['./label-value.component.scss']
})
export class LabelValueComponent implements OnInit {

  constructor() { }

  public ammount: any = 0;

  @Input() hasAnimation!: boolean;
  @Input() label!: string;
  @Input() set value(val: any) {
    // console.warn('NEW', Number.parseFloat(val).toFixed(2));
    if (this.hasAnimation) {
      this.animateValue(0, Number.parseFloat(val).toFixed(2), 1000);  
    } else {
      this.ammount = Number.parseFloat(val).toFixed(2);
    }
  }


  ngOnInit(): void { }
  
  
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
