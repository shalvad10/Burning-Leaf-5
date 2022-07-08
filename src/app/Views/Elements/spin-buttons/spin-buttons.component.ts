import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ComponentBase } from 'src/app/Base/ComponentBase';

@Component({
  selector: 'app-spin-buttons',
  templateUrl: './spin-buttons.component.html',
  styleUrls: ['./spin-buttons.component.scss']
})
export class SpinButtonsComponent extends ComponentBase implements OnInit {


  public lines: number[] = [1,2,3,4,5];
  public autoSpinCount: any[] = [10,20,50,100,null];
  public fixedLines: boolean = true;
  public showNMSelector: boolean = false;
  public showAutospinSelector: boolean = false;
  // public nominales: number[] = [0.03,0.5,1,2,3];
  // public selectedNominale: number = 0.03;

  @ViewChild('spinButton') spinButton!: ElementRef;

  @Output() spin = new EventEmitter<any>();
  @Output() autoSpin = new EventEmitter<any>();

  @Input() nominales?: number[];
  @Input() selectedNominale!: number;
  @Input() data: any;

  constructor(public ref: ChangeDetectorRef) {
    super(ref);
  }

  ngOnInit(): void {
    document.addEventListener( 'click', (e) => {
      if (this.showNMSelector == true && !this.hasAttributeInHierarchy(e.target, 'isNomminaleSelector') && !this.hasAttributeInHierarchy(e.target, 'isSelector')) {
        this.showNMSelector = false;
        this.showAutospinSelector = false;
      }
      if (this.showAutospinSelector == true && !this.hasAttributeInHierarchy(e.target, 'isAutospinSelector') && !this.hasAttributeInHierarchy(e.target, 'isSelector')) {
        this.showNMSelector = false;
        this.showAutospinSelector = false;
      }
    });
  }
  public hasAttributeInHierarchy(el: any,attr: any): boolean {
    if(el) {
      if(el.getAttribute(attr)) {
        return true;
      }
      return this.hasAttributeInHierarchy(el.parentElement,attr);
    }
    return false;
  }

  showLines(val: number): boolean {
    return this.lines.indexOf(val) == this.lines.length-1;
  }

  public get nominale() {
    return Number.parseFloat(this.selectedNominale.toString()).toFixed(2);
  }

  public get autoSpinInProgress() {
    return this.data.game.autoSpin.inProgress;
  }
  public get isInfinite() {
    return this.data.game.autoSpin.infiniteLoop;
  }
  public get spinsRemaining() {
    return this.data.game.autoSpin.spinsRemaining;
  }
  public get bonusInProgress() {
    return this.data.game.freeSpins.isActive;
  }
  public get bonusSpinsCount() {
    return this.data.game.freeSpins.count;
  }

  toggleNMSelector(): void {
    if (this.data.game.spinning == false) {
      this.showNMSelector = !this.showNMSelector;
      this.showAutospinSelector = false;
    }
  }

  toggleAutospinSelector(): void {
    if (this.data.game.spinning == false) {
      this.showNMSelector = false;
      this.showAutospinSelector = !this.showAutospinSelector;
    }
  }

  nominaleChanged(nominale: number): void {
    if (this.data.game.spinning == false) {
      this.showNMSelector = !this.showNMSelector;
      this.selectedNominale = nominale;
      this.emitAction('selectNominale', nominale);
    }
  }

  autoSpinSelected(autiSpin: number): void {
    if (this.data.game.spinning == false) {
      this.showAutospinSelector = !this.showAutospinSelector;
      this.autoSpin.emit(autiSpin);
    }
  }

  onSpin(): void {
    this.showNMSelector = false;
    this.showAutospinSelector = false;
    if (this.autoSpinInProgress) {
      this.emitAction('stopAutospin', {});
    } else if (this.data.game.spinning == false) {
      this.spinButton.nativeElement.classList.toggle('animate');
      this.spin.emit();
      setTimeout( () => {
        this.spinButton.nativeElement.classList.toggle('animate');
      }, 100);
    }
  }

  onAutoSpin(): void {
    this.toggleAutospinSelector();
  }

}
