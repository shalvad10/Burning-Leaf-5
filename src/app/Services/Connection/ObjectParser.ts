import { ConnEnums } from '../Enums/ConnEnums';
/* tslint:disable */
export class ObjectParser {
  public static timer: any;
  public static amountDivide: number = 10000;

  public static parseTime(e: any) {
    if (this.timer == undefined) {
      this.timer = new Date();
    }
    this.timer.setTime(e * 1000);

    return (
      this.timer.getDay() +
      '/' +
      this.timer.getMonth() +
      '/' +
      this.timer.getFullYear() +
      ' - ' +
      this.timer.getHours() +
      ':' +
      this.timer.getMinutes() +
      ':' +
      this.timer.getSeconds()
    );
  }

  ///////////////////// Event Objects
  public static parseEventPropertiesArray(arr: Array<Object>) {
    for (var num = 0; num < arr.length; num++) {
      arr[num] = this.parseEventObject(arr[num]);
    }
    return arr;
  }

  public static parseEventObject(obj: any) {
    obj = this.updateEventObjectAmounts(obj);

    // for (var key in ConnEnums.eventParams) {
    //   if (obj[ConnEnums.eventParams[key]] !== undefined) {
    //     obj[key] = obj[ConnEnums.eventParams[key]];
    //     delete obj[ConnEnums.eventParams[key]];
    //   }
    // }
    return obj;
  }

  public static updateEventObjectAmounts(obj: any)
  {
    for (var key in ConnEnums.eventParams)
    // {
    //   if (this.isEventAmountProperty(ConnEnums.eventParams[key]))
    //   {
    //     if (obj[ConnEnums.eventParams[key]])
    //     {
    //       obj[ConnEnums.eventParams[key]] = Number((obj[ConnEnums.eventParams[key]] / this.amountDivide).toFixed(2));
    //     }
    //     if (obj[key])
    //     {
    //       obj[key] = Number((obj[key] / this.amountDivide).toFixed(2));
    //     }
    //   }
    //   if (this.isEventTimerProperty(ConnEnums.eventParams[key]))
    //   {
    //     if (obj[ConnEnums.eventParams[key]])
    //     {
    //       obj[ConnEnums.eventParams[key]] = this.parseTime(obj[ConnEnums.eventParams[key]]);
    //     }
    //     if (obj[key])
    //     {
    //       obj[key] = this.parseTime(obj[ConnEnums.eventParams[key]]);
    //     }
    //   }
    //   if(this.isArrayOfObjects(ConnEnums.eventParams[key]))
    //   {
    //     if (obj[ConnEnums.eventParams[key]])
    //     {
    //       this.parseEventPropertiesArray(obj[ConnEnums.eventParams[key]]);
    //     }
    //     if (obj[key])
    //     {
    //       this.parseEventPropertiesArray(obj[key]);
    //     }
    //   }
    // }
    return obj;
  }

  public static isEventTimerProperty(id: any)
  {
    return false;
  }

  public static isEventAmountProperty(id: any)
  {
    switch (id)
    {
      case ConnEnums.eventParams.Balance:
      case ConnEnums.eventParams.StakeAmount:
      case ConnEnums.eventParams.WinnedAmount:
      {
        return true;
      }
    }
    return false;
  }

  public static isArrayOfObjects(id: any)
  {
    return false;
  }

  ///////////////////// Response Objects

  public static parseResponsePropertiesArray(arr: Array<Object>) {
    for (var num = 0; num < arr.length; num++) {
      arr[num] = this.parseResponseObject(arr[num]);
    }
    return arr;
  }

  public static parseResponseObject(obj: Object) {
    obj = this.updateResponseObjectAmounts(obj);

    // for (var key in ConnEnums.operationParams) {
    //   if (obj[ConnEnums.operationParams[key]] !== undefined) {
    //     obj[key] = obj[ConnEnums.operationParams[key]];
    //     delete obj[ConnEnums.operationParams[key]];
    //   }
    // }
    return obj;
  }

  public static updateResponseObjectAmounts(obj: any) {
    // for (var key in ConnEnums.operationParams) {
    //   if (this.isResponseAmountProperty(ConnEnums.operationParams[key])) {
    //     if (obj[ConnEnums.operationParams[key]]) {
    //       obj[ConnEnums.operationParams[key]] = Number(
    //         (obj[ConnEnums.operationParams[key]] / this.amountDivide).toFixed(2)
    //       );
    //     }
    //     if (obj[key]) {
    //       obj[key] = Number((obj[key] / this.amountDivide).toFixed(2));
    //     }
    //   }

    //   if (this.isResponseTimerProperty(ConnEnums.operationParams[key])) {
    //     if (obj[ConnEnums.operationParams[key]]) {
    //       obj[ConnEnums.operationParams[key]] = this.parseTime(
    //         obj[ConnEnums.operationParams[key]]
    //       );
    //     }
    //     if (obj[key]) {
    //       obj[key] = this.parseTime(obj[ConnEnums.operationParams[key]]);
    //     }
    //   }
    // }
    return obj;
  }

  public static isResponseAmountProperty(id: any) {
    switch (id) {
      case ConnEnums.operationParams.BetAmount:
      {
        return true;
      }
    }
    return false;
  }

  public static isResponseTimerProperty(id: any) {
    return false;
  }
  //////////////////////////////////////////////////////////////////////
}
