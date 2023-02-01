import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ExchangerateService } from 'src/app/services/exchangerate.service';
import { IHistoricoItem } from 'src/app/interfaces/IHistoricoItem';
import { IConversaoData } from 'src/app/interfaces/IConversaoData';
import { HistoricoService } from 'src/app/services/historico.service';
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
    private historicoService: HistoricoService
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
        .subscribe((data: IConversaoData) => {
          this.formatarDados(data, +this.valor > 10000);

          this.historicoService.adicionarItem(this.conversaoAtual);

          this.emitirConversao.emit(this.conversaoAtual);

          this.resetarForm();
        });
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
        .subscribe((result) => {
          this.formatarDados(
            result.response1,
            (result.response2 as IConversaoData).result > 10000
          );

          this.historicoService.adicionarItem(this.conversaoAtual);

          this.emitirConversao.emit(this.conversaoAtual);

          this.resetarForm();
        });
    }
  }

  formatarDados(data: IConversaoData, valorAlto: boolean) {
    const dataAtual: Date = new Date();

    const itemsLength = this.historicoService.getItems().length;

    const id =
      itemsLength > 0
        ? this.historicoService.getItems()[itemsLength - 1].id! + 1
        : 1;

    this.conversaoAtual = {
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

  resetarForm() {
    this.valor = '';
    this.moedaDestino = '';
    this.moedaOrigem = '';
  }
}
