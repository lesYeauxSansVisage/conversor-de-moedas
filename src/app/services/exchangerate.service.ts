import { Injectable } from '@angular/core';
import { IMoeda } from '../interfaces/Moeda';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IData } from '../interfaces/exchangeServiceData';

@Injectable({
  providedIn: 'root',
})
export class ExchangerateService {
  private symbolsURL = 'https://api.exchangerate.host/symbols';

  constructor(private http: HttpClient) {}

  fetchMoedas(): Observable<any> {
    return this.http.get(this.symbolsURL);
  }
}
