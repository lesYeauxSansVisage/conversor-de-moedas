import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HistoricoService } from 'src/app/services/historico.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IHistoricoItem } from 'src/app/interfaces/IHistoricoItem';
import { ConfirmarExclusaoComponent } from 'src/app/components/confirmar-exclusao/confirmar-exclusao.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
})
export class HistoricoComponent implements OnInit, AfterViewInit, OnDestroy {
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

  dataSource: MatTableDataSource<IHistoricoItem> =
    new MatTableDataSource<IHistoricoItem>();

  items: IHistoricoItem[] = [];

  private alteracaoHistoricoSubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private historicoService: HistoricoService,
    public dialog: MatDialog,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.items = this.historicoService.getItems();
    this.dataSource.data = this.items;

    this.alteracaoHistoricoSubscription =
      this.historicoService.alteracaoHistorico.subscribe(
        (items: IHistoricoItem[]) => {
          this.items = items;

          this.dataSource.data = this.items;
        }
      );
  }

  ngOnDestroy(): void {
    if (this.alteracaoHistoricoSubscription) {
      this.alteracaoHistoricoSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item: any, property: any) => {
      switch (property) {
        case 'hora':
          return new Date(item.data);

        default:
          return item[property];
      }
    };
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmarExclusaoComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.historicoService.excluirItem(id);
        this.openSnackBar('O item foi excluído permanentemente.');
      }
    });
  }

  openSnackBar(message: string) {
    this._snackbar.open(message, '', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 3 * 1000,
      panelClass: ['bg-dark', 'text-light'],
    });
  }
}
