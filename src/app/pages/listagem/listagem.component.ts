import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ISimbolosData } from 'src/app/interfaces/ISimbolosData';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ExchangerateService } from 'src/app/services/exchangerate.service';

import { IMoeda } from 'src/app/interfaces/IMoeda';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css'],
})
export class ListagemComponent implements OnInit {
  displayedColumns: string[] = ['code', 'description'];
  dataSource: MatTableDataSource<IMoeda>;

  private moedas: IMoeda[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private exchangeRateService: ExchangerateService,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.exchangeRateService.fetchMoedas().subscribe(
      (data: ISimbolosData) => {
        this.moedas = Object.values(data.symbols);

        this.dataSource = new MatTableDataSource(this.moedas);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => this.openSnackBar()
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSnackBar() {
    this._snackbar.open(
      'Ocorreu um erro. Por favor recarregue a página para tentar carregar as moedas novamente.',
      '',
      {
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        duration: 3 * 1000,
        panelClass: ['bg-dark', 'text-light'],
      }
    );
  }
}
