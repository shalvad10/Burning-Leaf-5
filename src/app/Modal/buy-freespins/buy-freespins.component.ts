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

  @Input() data: any;
  @Input() freeSpins:any;
  @Input() selectedBet: any;
  @Input() selectedNominale: any;
  @Input() nominales: any;
  @Input() gameLine: any;
  @Input() set betMultipliers(val: any) {
    setTimeout( ()=> {
      for(let i=0; i< val.length; i++) {
        for(let j=0; j < this.nominales.length; j++) {
          if (this.betArr.includes(this.bet(val[i],this.nominales[j])) == false) {
            this.betArr.push(this.bet(val[i],this.nominales[j]));
          }
        }
      }
      this.betArr.sort((a,b) => a-b);
      this.dataLoaded = true;
    }, 100);
  }

  constructor(ref: ChangeDetectorRef) {
    super(ref);
  }

  ngOnInit(): void {
    
  }
  public bet(betMultiplier:number, nominale: number) {
    return betMultiplier * this.gameLine * nominale;
  }

  public selectBet(direction: number) {
    if ( direction < 0 && this.betArr.indexOf(this.selectedBet) !== 0 ) {
      this.selectedBet = this.betArr[this.betArr.indexOf(this.selectedBet)-1];
    } else if (direction > 0 && this.betArr.indexOf(this.selectedBet) !== this.betArr.length-1) {
      this.selectedBet = this.betArr[this.betArr.indexOf(this.selectedBet)+1];
    }
  }

}
