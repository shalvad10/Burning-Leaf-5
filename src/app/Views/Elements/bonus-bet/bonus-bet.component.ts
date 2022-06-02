import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-bonus-bet',
  templateUrl: './bonus-bet.component.html',
  styleUrls: ['./bonus-bet.component.scss']
})
export class BonusBetComponent implements OnInit {

  @Input() bet: any;
  @Output() selectBet:any = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  
  change(direction: number): void {
    this.selectBet.emit(direction);
  }

}
