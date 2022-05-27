import Symbol from "src/app/Views/game/Engine/Symbol";

export default class SharedMethods {

    public static generateArrFromObj(obj: any): string[][] {
        let tmpArr1: string[] = [ Symbol.getByID(obj[0].PlayerName) , Symbol.getByID(obj[1].PlayerName) , Symbol.getByID(obj[2].PlayerName)     ];
        let tmpArr2: string[] = [ Symbol.getByID(obj[0].SessionId)  , Symbol.getByID(obj[1].SessionId)  , Symbol.getByID(obj[2].SessionId)      ];
        let tmpArr3: string[] = [ Symbol.getByID(obj[0].Balance)    , Symbol.getByID(obj[1].Balance)    , Symbol.getByID(obj[2].Balance)        ];
        let tmpArr4: string[] = [ Symbol.getByID(obj[0].SlotId)     , Symbol.getByID(obj[1].SlotId)     , Symbol.getByID(obj[2].SlotId)         ];
        let tmpArr5: string[] = [ Symbol.getByID(obj[0]['4'])       , Symbol.getByID(obj[1]['4'])       , Symbol.getByID(obj[2]['4'])           ];
        return [tmpArr1,tmpArr2,tmpArr3,tmpArr4,tmpArr5];
    }
    
}
