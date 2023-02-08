import { Injectable } from '@angular/core';
import { IHistoricoItem } from '../interfaces/IHistoricoItem';
import { IConversaoData } from '../interfaces/IConversaoData';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoricoService {
  alteracaoHistorico = new Subject<IHistoricoItem[]>();

  private items: IHistoricoItem[] = [];

  constructor() {
    if (sessionStorage.getItem('items')) {
      const items: string = sessionStorage.getItem('items')!;
      this.items = JSON.parse(items) as IHistoricoItem[];
    }
  }

  getItems() {
    return this.items;
  }

  salvarItemsSessao() {
    sessionStorage.setItem('items', JSON.stringify(this.items));
  }

  adicionarItem(item: IHistoricoItem) {
    this.items.push(item);
    this.alteracaoHistorico.next(this.items);
    this.salvarItemsSessao();
  }

  excluirItem(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
    this.alteracaoHistorico.next(this.items);
    this.salvarItemsSessao();
  }

  formatarDados(data: IConversaoData, valor: number): IHistoricoItem {
    const dataAtual: Date = new Date();

    const itemsLength = this.getItems().length;

    const valorAlto = valor > 10000;

    const id = itemsLength > 0 ? this.getItems()[itemsLength - 1].id! + 1 : 1;

    return {
      id: id,
      data: dataAtual,
      moedaDeDestino: data.query.to,
      moedaDeOrigem: data.query.from,
      valorDeEntrada: data.query.amount,
      valorDeSaida: data.result,
      taxa: data.info.rate,
      valorAlto: valorAlto,
    };
  }
}
