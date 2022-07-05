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

  public multipliers: any;
  public nomMult: any;

  @Input() data: any;
  @Input() freeSpins:any;
  @Input() selectedBet: any;
  @Input() currency!: string;
  @Input() selectedNominale: any;
  @Input() nominales: any;
  @Input() gameLine: any;
  @Input() selectedMultiplierIndex: any;
  @Input() set betMultipliers(val: any) {
    setTimeout( ()=> {
      this.multipliers = val;
      for(let i=0; i< val.length; i++) {
        for(let j=0; j < this.nominales.length; j++) {
          if (this.betArr.includes(this.bet(val[i],this.nominales[j])) == false) {
            this.betArr.push(this.bet(val[i],this.nominales[j]));
          }
        }
      }
      this.betArr.sort((a,b) => a-b);
      this.dataLoaded = true;
      this.nomMult = {
        nominale: this.selectedNominale,
        multiplier: val[this.selectedMultiplierIndex]
      };
    }, 100);
  }

  constructor(ref: ChangeDetectorRef) {
    super(ref);
  }

  ngOnInit(): void {
    
  }

  public nominaleAndMultiplier(bet: any, index: any): any {
    let tmpObj = {
      nominale: -1,
      multiplier: -1
    };
    for(let i=0; i<this.nominales.length; i++) {
      if (i ==0) {
        if (index <= (i+1) * this.multipliers.length) {
            tmpObj.nominale = this.nominales[i];
            tmpObj.multiplier = (bet / this.gameLine) / this.nominales[i];
            break;
        }
      }else if (index <= i * this.multipliers.length) {
        tmpObj.nominale = this.nominales[i];
        tmpObj.multiplier = (bet / this.gameLine) / this.nominales[i];
        break;
      }
    }
    return tmpObj;
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
    this.nomMult = this.nominaleAndMultiplier(this.selectedBet,this.betArr.indexOf(this.selectedBet));
  }

}
