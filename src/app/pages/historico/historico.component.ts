import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HistoricoService } from 'src/app/services/historico.service';
import { MatDialog } from '@angular/material/dialog';

import { IHistoricoItem } from 'src/app/interfaces/IHistoricoItem';
import { ConfirmarExclusaoComponent } from 'src/app/components/confirmar-exclusao/confirmar-exclusao.component';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
})
export class HistoricoComponent implements OnInit {
  displayedColumns: string[] = [
    'valorAlto',
    'valorDeEntrada',
    'moedaDeOrigem',
    'valorDeSaida',
    'moedaDeDestino',
    'taxa',
    'data',
    'hora',
    'excluir',
  ];

  dataSource: MatTableDataSource<IHistoricoItem>;

  items: IHistoricoItem[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private historicoService: HistoricoService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.items = this.historicoService.getItems();
    this.inicializarMatTable();

    this.historicoService.alteracaoHistorico.subscribe(
      (items: IHistoricoItem[]) => {
        this.items = items;

        this.inicializarMatTable();
      }
    );
  }

  inicializarMatTable() {
    this.dataSource = new MatTableDataSource(this.items);

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.sortingDataAccessor = (item: any, property: any) => {
        switch (property) {
          case 'hora':
            return item.data;

          default:
            return item[property];
        }
      };
    });
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmarExclusaoComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.historicoService.excluirItem(id);
      }
    });
  }
}
