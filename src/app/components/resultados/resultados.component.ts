import { Component, Input, OnInit } from '@angular/core';
import { IHistoricoItem } from 'src/app/interfaces/IHistoricoItem';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
})
export class ResultadosComponent implements OnInit {
  @Input() conversaoAtual: IHistoricoItem;

  constructor() {}

  ngOnInit(): void {}
}
