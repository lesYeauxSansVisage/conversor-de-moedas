export interface IHistoricoItem {
  data: {
    horas: number;
    minutos: number;
    data: string;
  };
  valorDeEntrada: number;
  valorDeSaída: number;
  moedaDeOrigem: string;
  moedaDeDestino: string;
  taxa: number;
}
