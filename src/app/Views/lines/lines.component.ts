import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ComponentBase } from 'src/app/Base/ComponentBase';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss']
})
export class LinesComponent extends ComponentBase implements OnInit {

  public lines: number[] = [1,2,3,4,5];
  public line: number= 5;
  public fixedLines: boolean = true;

  @ViewChild('spinButton') spinButton!: ElementRef;

  @Input() hasButtons: boolean = false;

  @Input() nominales?: number[];
  @Input() selectedNominale!: number;
  @Input() data: any;

  @Output() spin = new EventEmitter<any>();
  @Output() autoSpin = new EventEmitter<any>();

  constructor(public ref: ChangeDetectorRef) {
    super(ref);
  }

  ngOnInit(): void {
  }

  public get autoSpinInProgress() {
    return this.data.game.autoSpin.inProgress;
  }
  
  showLines(val: number): boolean {
    return this.lines.indexOf(val) == this.lines.length-1;
  }

  onSpin(): void {
    this.spin.emit();
  }

  onAutoSpin(): void {
    this.autoSpin.emit();
  }

}
