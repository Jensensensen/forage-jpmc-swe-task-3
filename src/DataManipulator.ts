import { ServerRespond } from './DataStreamer';

export interface Row {
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
  price_abc: number,
  price_def: number,
  timestamp: Date,
  ratio: number
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    // serverRespond[0] -> stock 1 and serverRespond[0] -> stock 2
    const price_abc = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const price_def = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = price_abc / price_def
    // How to get historical data?
    const upper_bound = 1 + 0.05;
    const lower_bound = 1 - 0.05;
    return {
      upper_bound: upper_bound,
      lower_bound: lower_bound,
      trigger_alert: (ratio > upper_bound || ratio < lower_bound) ? ratio : undefined,
      price_abc: price_abc,
      price_def: price_def,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp,
      ratio: ratio,
    }
  }
}
