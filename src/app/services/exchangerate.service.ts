import { Injectable } from '@angular/core';
import { ISimbolosData } from '../interfaces/ISimbolosData';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IConversaoData } from '../interfaces/IConversaoData';

@Injectable({
  providedIn: 'root',
})
export class ExchangerateService {
  private symbolsURL = 'https://api.exchangerate.host/symbols';

  constructor(private http: HttpClient) {}

  fetchMoedas(): Observable<ISimbolosData> {
    return this.http.get<ISimbolosData>(this.symbolsURL);
  }

  converterMoeda(
    moedaOrigem: string,
    moedaDestino: string,
    valor: number
  ): Observable<IConversaoData> {
    return this.http.get<IConversaoData>(
      `https://api.exchangerate.host/convert?from=${moedaOrigem}&to=${moedaDestino}&amount=${valor}`
    );
  }

  verificarValorAlto(valor: number, moeda: string): Observable<IConversaoData> {
    return this.converterMoeda(moeda, 'USD', valor);
  }
}
