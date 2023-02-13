import { Injectable } from '@angular/core';
import { ISimbolosData } from '../interfaces/ISimbolosData';

import { HttpClient } from '@angular/common/http';
import { Observable, mergeMap, throwError, of } from 'rxjs';
import { IConversaoData } from '../interfaces/IConversaoData';

@Injectable({
  providedIn: 'root',
})
export class ExchangerateService {
  symbolsURL = 'https://api.exchangerate.host/symbols';

  constructor(private http: HttpClient) {}

  fetchMoedas(): Observable<ISimbolosData> {
    return this.http.get<ISimbolosData>(this.symbolsURL);
  }

  converterMoeda(
    moedaOrigem: string,
    moedaDestino: string,
    valor: number
  ): Observable<IConversaoData> {
    return this.http
      .get<IConversaoData>(
        `https://api.exchangerate.host/convert?from=${moedaOrigem}&to=${moedaDestino}&amount=${valor}`
      )
      .pipe(
        mergeMap((resposta) => {
          if (!resposta.result || !resposta.info.rate) {
            return throwError(() => 'O resultado ou a taxa são inválidos');
          }
          return of(resposta);
        })
      );
  }

  verificarValorEmDolar(
    valor: number,
    moeda: string
  ): Observable<IConversaoData> {
    return this.converterMoeda(moeda, 'USD', valor);
  }
}
