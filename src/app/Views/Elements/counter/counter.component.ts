import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  constructor() { }

  @Input() value      : number = 1;
  @Input() minValue!  : number;
  @Input() maxValue!  : number;

  ngOnInit(): void {
  }

  changeValue(direction: number): void {
    let tmpValue = this.value + direction;
    this.value = (tmpValue >= this.minValue && tmpValue <= this.maxValue) ? tmpValue : this.value;
  }

}
