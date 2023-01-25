import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExchangerateService {
  private symbolsURL = 'https://api.exchangerate.host/symbols';

  constructor(private http: HttpClient) {}

  fetchMoedas(): Observable<any> {
    return this.http.get(this.symbolsURL);
  }

  converterMoeda(moedaOrigem: string, moedaDestino: string, valor: number) {
    console.log(moedaOrigem, moedaDestino, valor);

    console.log(
      `https://api.exchangerate.host/convert?amount=${valor}from=${moedaOrigem}&to=${moedaDestino}`
    );

    return this.http.get(
      `https://api.exchangerate.host/convert?from=${moedaOrigem}&to=${moedaDestino}&amount=${valor}`
    );
  }
}
