// I usually use .d.ts for typing external data

type PoloniexExchangeDirection = {
  id: number;
  last: string;
  lowestAsk: string;
  highestBid: string;
  percentChange: string;
  baseVolume: string;
  quoteVolume: string;
  isFrozen: string;
  postOnly: string;
  high24hr: string;
  low24hr: string;
};

type PoloniexResponse = {
  [direction: string]: PoloniexExchangeDirection;
};

type PoloniexCell = PoloniexExchangeDirection & { direction: string };
