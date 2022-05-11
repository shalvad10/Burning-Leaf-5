import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bet-block',
  templateUrl: './bet-block.component.html',
  styleUrls: ['./bet-block.component.scss']
})
export class BetBlockComponent implements OnInit {

  @Input() currency!: string;
  @Input() value: any;
  @Input() isSelected!: boolean;

  constructor() { }

  ngOnInit(): void { }

}
