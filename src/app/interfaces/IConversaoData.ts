export interface IConversaoData {
  query: {
    from: string;
    to: string;
    amount: number;
  };
  result: number;
  date: string;
  info: {
    rate: number;
  };
}
