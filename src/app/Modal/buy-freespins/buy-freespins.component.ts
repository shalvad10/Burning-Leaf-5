import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/Base/ComponentBase';

@Component({
  selector: 'app-buy-freespins',
  templateUrl: './buy-freespins.component.html',
  styleUrls: ['./buy-freespins.component.scss']
})
export class BuyFreespinsComponent extends ComponentBase implements OnInit {


  public betArr: number[] = [];
  public dataLoaded: boolean = false;

  @Input() freeSpins:any;
  @Input() selectedBet: any;
  @Input() selectedNominale: any;
  @Input() gameLine: any;
  @Input() set betMultipliers(val: any) {
    setTimeout( ()=> {
      val.forEach( (mult: any) => {
        this.betArr.push(this.bet(mult));
      });
      this.dataLoaded = true;
    }, 100);
  }

  constructor(private ref: ChangeDetectorRef) {
    super(ref);
  }

  ngOnInit(): void {
    
  }
  public bet(betMultiplier:number) {
    return betMultiplier * this.gameLine * this.selectedNominale;
  }

  public selectBet(direction: number) {
    if ( direction < 0 && this.betArr.indexOf(this.selectedBet) !== 0 ) {
      this.selectedBet = this.betArr[this.betArr.indexOf(this.selectedBet)-1];
    } else if (direction > 0 && this.betArr.indexOf(this.selectedBet) !== this.betArr.length-1) {
      this.selectedBet = this.betArr[this.betArr.indexOf(this.selectedBet)+1];
    }
  }

}
