import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExchangerateService {
  private coins = [];

  constructor() {}

  public async getSymbos() {
    const res = await fetch('https://api.exchangerate.host/symbols');
    const data = await res.json();

    console.log(data.symbols);
  }
}
