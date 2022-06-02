import Symbol from "src/app/Views/game/Engine/Symbol";

export interface WinnObject {
    isWin: boolean;
    symbol: string;
    winType: string;
    lineId: number;
}
export default class SharedMethods {

    public static generateArrFromObj(obj: any): string[][] {
        let tmpArr1: string[] = [ Symbol.getByID(obj[0].PlayerName) , Symbol.getByID(obj[1].PlayerName) , Symbol.getByID(obj[2].PlayerName)     ];
        let tmpArr2: string[] = [ Symbol.getByID(obj[0].SessionId)  , Symbol.getByID(obj[1].SessionId)  , Symbol.getByID(obj[2].SessionId)      ];
        let tmpArr3: string[] = [ Symbol.getByID(obj[0].Balance)    , Symbol.getByID(obj[1].Balance)    , Symbol.getByID(obj[2].Balance)        ];
        let tmpArr4: string[] = [ Symbol.getByID(obj[0].GameId)     , Symbol.getByID(obj[1].GameId)     , Symbol.getByID(obj[2].GameId)         ];
        let tmpArr5: string[] = [ Symbol.getByID(obj[0]['4'])       , Symbol.getByID(obj[1]['4'])       , Symbol.getByID(obj[2]['4'])           ];
        return [tmpArr1,tmpArr2,tmpArr3,tmpArr4,tmpArr5];
    }

    public static symbols(id: number): string {
      let symbols = [ "leaf", "cherry", "lemon", "orange", "plum", "bell", "wintry", "grape", "seven", "dollar", "star" ];
      return id < 100 ? symbols[id] : (id == 100 ? symbols[symbols.length-2] : symbols[symbols.length-1]);
    }
    
    public static checkWin(data: any): WinnObject[] {
        let winningArray: WinnObject[] = [];
        let winObj: WinnObject = {
            isWin: false,
            symbol: '',
            winType: '',
            lineId: 0
        };
        
        for (let i=0; i < data.specialSymbols.length; i++) {
            if (data.specialSymbols[i].Multiplier > 0) {
                winObj.isWin = true;
                winObj.symbol = this.symbols(data.specialSymbols[i].SymbolId);
                winObj.winType = 'special';
                winningArray.push(winObj);
            }
        }
        for (let i=0; i<data.lines.length; i++) {
            if (data.lines[i].Multiplier > 0) {
                winObj.isWin = true;
                winObj.symbol = this.symbols(data.lines[i].SymbolId);
                winObj.lineId = data.lines[i].LineId;
                winObj.winType = 'line';
                winningArray.push(winObj);
            }
        }
        return winningArray;
    }
    
}
