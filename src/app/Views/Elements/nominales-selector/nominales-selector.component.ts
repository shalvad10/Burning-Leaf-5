import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nominales-selector',
  templateUrl: './nominales-selector.component.html',
  styleUrls: ['./nominales-selector.component.scss']
})
export class NominalesSelectorComponent implements OnInit {

  constructor() { }
  @Input() nominales?: number[];
  @Input() selectedNominale?: number;
  
  @Output() nominaleChanged = new EventEmitter<number>();

  ngOnInit(): void { }

  selectNominale(nominale: number): void {
    this.nominaleChanged.emit(nominale);
  }
}
