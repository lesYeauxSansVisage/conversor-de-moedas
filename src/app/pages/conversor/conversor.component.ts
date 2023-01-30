import { Component } from '@angular/core';
import { IHistoricoItem } from 'src/app/interfaces/IHistoricoItem';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css'],
})
export class ConversorComponent {
  conversaoAtual: IHistoricoItem;

  constructor() {}

  atualizarConversaoAtual(event: IHistoricoItem) {
    this.conversaoAtual = event;
  }
}
