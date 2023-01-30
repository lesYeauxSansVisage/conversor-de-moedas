import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { IHistoricoItem } from 'src/app/interfaces/IHistoricoItem';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
})
export class HistoricoComponent implements OnInit {
  displayedColumns: string[] = [
    'valorDeEntrada',
    'moedaDeOrigem',
    'valorDeSaida',
    'moedaDeDestino',
    'taxa',
    'data',
    'hora',
  ];
  dataSource: MatTableDataSource<IHistoricoItem>;

  private items: IHistoricoItem[] = [
    {
      data: {
        data: '2023-01-27',
        horas: 18,
        minutos: 23,
      },
      moedaDeDestino: 'AFN',
      moedaDeOrigem: 'ALL',
      valorDeEntrada: 4,
      valorDeSaida: 4.79962,
      taxa: 1.199905,
    },
    {
      data: {
        data: '2023-01-27',
        horas: 18,
        minutos: 23,
      },
      moedaDeDestino: 'AFN',
      moedaDeOrigem: 'ALL',
      valorDeEntrada: 4,
      valorDeSaida: 4.799621,
      taxa: 1.199905,
    },
    {
      data: {
        data: '2023-01-27',
        horas: 18,
        minutos: 23,
      },
      moedaDeDestino: 'AFN',
      moedaDeOrigem: 'ALL',
      valorDeEntrada: 4,
      valorDeSaida: 4.799619,
      taxa: 1.199905,
    },
    {
      data: {
        data: '2023-01-27',
        horas: 18,
        minutos: 23,
      },
      moedaDeDestino: 'AFN',
      moedaDeOrigem: 'ALL',
      valorDeEntrada: 4,
      valorDeSaida: 4.799619,
      taxa: 1.199905,
    },
    {
      data: {
        data: '2023-01-27',
        horas: 18,
        minutos: 23,
      },
      moedaDeDestino: 'AFN',
      moedaDeOrigem: 'ALL',
      valorDeEntrada: 4,
      valorDeSaida: 4.799619,
      taxa: 1.199905,
    },
    {
      data: {
        data: '2023-01-27',
        horas: 18,
        minutos: 23,
      },
      moedaDeDestino: 'AFN',
      moedaDeOrigem: 'ALL',
      valorDeEntrada: 4,
      valorDeSaida: 4.799619,
      taxa: 1.199905,
    },
    {
      data: {
        data: '2023-01-27',
        horas: 18,
        minutos: 23,
      },
      moedaDeDestino: 'AFN',
      moedaDeOrigem: 'ALL',
      valorDeEntrada: 4,
      valorDeSaida: 4.799619,
      taxa: 1.199905,
    },
    {
      data: {
        data: '2023-01-27',
        horas: 18,
        minutos: 23,
      },
      moedaDeDestino: 'AFN',
      moedaDeOrigem: 'ALL',
      valorDeEntrada: 4,
      valorDeSaida: 4.799619,
      taxa: 1.199905,
    },
    {
      data: {
        data: '2023-01-27',
        horas: 18,
        minutos: 23,
      },
      moedaDeDestino: 'AFN',
      moedaDeOrigem: 'ALL',
      valorDeEntrada: 4,
      valorDeSaida: 4.799619,
      taxa: 1.199905,
    },
    {
      data: {
        data: '2023-01-27',
        horas: 18,
        minutos: 23,
      },
      moedaDeDestino: 'AFN',
      moedaDeOrigem: 'ALL',
      valorDeEntrada: 4,
      valorDeSaida: 4.799619,
      taxa: 1.199905,
    },
    {
      data: {
        data: '2023-01-27',
        horas: 18,
        minutos: 23,
      },
      moedaDeDestino: 'AFN',
      moedaDeOrigem: 'ALL',
      valorDeEntrada: 4,
      valorDeSaida: 4.799619,
      taxa: 1.199905,
    },
    {
      data: {
        data: '2023-01-27',
        horas: 18,
        minutos: 23,
      },
      moedaDeDestino: 'AFN',
      moedaDeOrigem: 'ALL',
      valorDeEntrada: 4,
      valorDeSaida: 4.799619,
      taxa: 1.199905,
    },
    {
      data: {
        data: '2023-01-27',
        horas: 18,
        minutos: 23,
      },
      moedaDeDestino: 'AFN',
      moedaDeOrigem: 'ALL',
      valorDeEntrada: 4,
      valorDeSaida: 4.799619,
      taxa: 1.199905,
    },
    {
      data: {
        data: '2023-01-27',
        horas: 18,
        minutos: 23,
      },
      moedaDeDestino: 'AFN',
      moedaDeOrigem: 'ALL',
      valorDeEntrada: 4,
      valorDeSaida: 4.799619,
      taxa: 1.199905,
    },
    {
      data: {
        data: '2023-01-27',
        horas: 18,
        minutos: 23,
      },
      moedaDeDestino: 'AFN',
      moedaDeOrigem: 'ALL',
      valorDeEntrada: 4,
      valorDeSaida: 4.799619,
      taxa: 1.199905,
    },
    {
      data: {
        data: '2023-01-27',
        horas: 18,
        minutos: 23,
      },
      moedaDeDestino: 'AFN',
      moedaDeOrigem: 'ALL',
      valorDeEntrada: 4,
      valorDeSaida: 4.799619,
      taxa: 1.199905,
    },
    {
      data: {
        data: '2023-01-27',
        horas: 18,
        minutos: 23,
      },
      moedaDeDestino: 'AFN',
      moedaDeOrigem: 'ALL',
      valorDeEntrada: 4,
      valorDeSaida: 4.799619,
      taxa: 1.199905,
    },
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.items);

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {}
}
