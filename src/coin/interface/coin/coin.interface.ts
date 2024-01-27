export interface Coin {
    id: number;
    name: string;
    symbol: string;
    decimals: number;
    address: string;
    icon: string;
    balance: number;
    issuer: string;
    price: number;
    blockchain: {
      network: string;
      contractType: string;
    };
    creationDate: string;
  }
  