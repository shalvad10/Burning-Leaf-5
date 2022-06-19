import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-autospin-selector',
  templateUrl: './autospin-selector.component.html',
  styleUrls: ['./autospin-selector.component.scss']
})
export class AutospinSelectorComponent implements OnInit {

  constructor() { }
  @Input() open!:boolean;
  @Input() nominales?: number[];
  @Input() selectedNominale?: number;
  
  @Output() nominaleChanged = new EventEmitter<number>();

  ngOnInit(): void { }

  selectNominale(nominale: number): void {
    this.nominaleChanged.emit(nominale);
  }

}
