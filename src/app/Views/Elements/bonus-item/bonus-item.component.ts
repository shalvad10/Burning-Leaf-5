import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bonus-item',
  templateUrl: './bonus-item.component.html',
  styleUrls: ['./bonus-item.component.scss']
})
export class BonusItemComponent implements OnInit {

  @Input() freeSpin: any;
  @Input() selectedBet: any;

  constructor() { }

  ngOnInit(): void {
  }

}
