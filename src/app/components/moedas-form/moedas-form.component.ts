import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ExchangerateService } from 'src/app/services/exchangerate.service';
import { IHistoricoItem } from 'src/app/interfaces/IHistoricoItem';
import { IConversaoData } from 'src/app/interfaces/IConversaoData';

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

  constructor(private exchangeRateService: ExchangerateService) {}

  ngOnInit(): void {
    this.exchangeRateService.fetchMoedas().subscribe((data) => {
      this.moedas = Object.keys(data.symbols);
    });
  }

  onSubmit() {
    if (Number(this.valor) <= 0 || !this.valor) {
      console.log('Não é possível calcular valores menores que 0');
      return;
    }

    this.exchangeRateService
      .converterMoeda(this.moedaOrigem, this.moedaDestino, Number(this.valor))
      .subscribe((data: IConversaoData) => {
        const dataAtual: Date = new Date();
        this.conversaoAtual = {
          data: {
            data: data.date,
            horas: dataAtual.getHours(),
            minutos: dataAtual.getMinutes(),
          },
          moedaDeDestino: data.query.to,
          moedaDeOrigem: data.query.from,
          valorDeEntrada: data.query.amount,
          valorDeSaida: data.result,
          taxa: data.info.rate,
        };

        this.emitirConversao.emit(this.conversaoAtual);
      });
  }
}
