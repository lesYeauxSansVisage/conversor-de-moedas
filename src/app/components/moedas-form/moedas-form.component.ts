import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ExchangerateService } from 'src/app/services/exchangerate.service';
import { IHistoricoItem } from 'src/app/interfaces/IHistoricoItem';
import { IConversaoData } from 'src/app/interfaces/IConversaoData';
import { HistoricoService } from 'src/app/services/historico.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { map, zip } from 'rxjs';

@Component({
  selector: 'app-moedas-form',
  templateUrl: './moedas-form.component.html',
  styleUrls: ['./moedas-form.component.css'],
})
export class MoedasFormComponent implements OnInit {
  @Output() emitirConversao = new EventEmitter<IHistoricoItem>();

  moedas: string[];

  moedaOrigem: string;

  moedaDestino: string;

  conversaoAtual: IHistoricoItem;

  valor: string;

  constructor(
    private exchangeRateService: ExchangerateService,
    private historicoService: HistoricoService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.exchangeRateService.fetchMoedas().subscribe((data) => {
      this.moedas = Object.keys(data.symbols);
    });
  }

  onSubmit() {
    if (this.moedaOrigem == 'USD') {
      this.exchangeRateService
        .converterMoeda(this.moedaOrigem, this.moedaDestino, +this.valor)
        .subscribe(
          (data: IConversaoData) => {
            this.conversaoAtual = this.historicoService.formatarDados(
              data,
              data.query.amount
            );

            this.atualizarConversaoAtual();

            this.openSnackBar('Sua conversão está disponível no histórico.');
          },
          (err) =>
            this.openSnackBar(
              'Houve um erro na conversão. Por favor tente novamente.'
            )
        );
    } else {
      zip(
        this.exchangeRateService.converterMoeda(
          this.moedaOrigem,
          this.moedaDestino,
          +this.valor
        ),
        this.exchangeRateService.verificarValorAlto(
          +this.valor,
          this.moedaOrigem
        )
      )
        .pipe(map(([response1, response2]) => ({ response1, response2 })))
        .subscribe(
          (result) => {
            this.conversaoAtual = this.historicoService.formatarDados(
              result.response1,
              (result.response2 as IConversaoData).result
            );

            this.atualizarConversaoAtual();
            this.openSnackBar('Sua conversão está disponível no histórico.');
          },
          (err) =>
            this.openSnackBar(
              'Houve um erro na conversão. Por favor tente novamente.'
            )
        );
    }

    this.resetarForm();
  }

  resetarForm() {
    this.valor = '';
    this.moedaDestino = '';
    this.moedaOrigem = '';
  }

  atualizarConversaoAtual() {
    this.historicoService.adicionarItem(this.conversaoAtual);

    this.emitirConversao.emit(this.conversaoAtual);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 3 * 1000,
      panelClass: ['bg-dark', 'text-light'],
    });
  }
}
