import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-buy-freespins',
  templateUrl: './buy-freespins.component.html',
  styleUrls: ['./buy-freespins.component.scss']
})
export class BuyFreespinsComponent implements OnInit {

  @Input() freeSpins:any;
  @Input() selectedBet: any;

  constructor() { }

  ngOnInit(): void {
  }

}
