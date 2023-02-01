export interface IHistoricoItem {
  id?: number;
  data: Date;
  valorDeEntrada: number;
  valorDeSaida: number;
  moedaDeOrigem: string;
  moedaDeDestino: string;
  taxa: number;
  valorAlto: boolean;
}
