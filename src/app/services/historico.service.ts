import { Injectable } from '@angular/core';
import { IHistoricoItem } from '../interfaces/IHistoricoItem';

@Injectable({
  providedIn: 'root',
})
export class HistoricoService {
  items: IHistoricoItem[];

  constructor() {}

  public getItemsSessao() {
    if (sessionStorage.getItem('items')) {
      console.log('Há items salvos!');
    }
  }

  salvarItemsSessao() {
    sessionStorage.setItem('items', JSON.stringify(this.items));
  }
}
