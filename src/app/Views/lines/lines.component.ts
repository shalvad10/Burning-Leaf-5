import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ComponentBase } from 'src/app/Base/ComponentBase';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss']
})
export class LinesComponent extends ComponentBase implements OnInit {

  public lines: number[] = [1,2,3,4,5];
  public fixedLines: boolean = true;
  public showNMSelector: boolean = false;
  // public nominales: number[] = [0.03,0.5,1,2,3];
  // public selectedNominale: number = 0.03;

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

  ngOnInit(): void {}

  showLines(val: number): boolean {
    return this.lines.indexOf(val) == this.lines.length-1;
  }

  public get nominale() {
    return Number.parseFloat(this.selectedNominale.toString()).toFixed(2);
  }

  toggleNMSelector(): void {
    this.showNMSelector = !this.showNMSelector;
  }

  nominaleChanged(nominale: number): void {
    if (this.data.game.spinning == false) {
      this.showNMSelector = !this.showNMSelector;
      this.selectedNominale = nominale;
      this.emitAction('selectNominale', nominale);
    }
  }

  onSpin(): void {
    if (this.data.game.spinning == false) {
      this.spinButton.nativeElement.classList.toggle('animate');
      this.spin.emit();
      setTimeout( () => {
        this.spinButton.nativeElement.classList.toggle('animate');
      }, 100);
    }
  }

  onAutoSpin(): void {
    if (this.data.game.spinning == false) {
      this.autoSpin.emit();
    }
  }

}
