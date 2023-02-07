import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
export class ListagemComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['code', 'description'];
  dataSource: MatTableDataSource<IMoeda> = new MatTableDataSource<IMoeda>();

  private _moedas: IMoeda[] = [];

  public get moedas(): IMoeda[] {
    return this._moedas;
  }

  public set moedas(value: IMoeda[]) {
    this._moedas = value;
  }

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

        this.dataSource.data = this.moedas;
      },
      (err) => this.openSnackBar()
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
