import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoComponent } from './historico.component';
import { HistoricoService } from 'src/app/services/historico.service';
import { IHistoricoItem } from 'src/app/interfaces/IHistoricoItem';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Subject } from 'rxjs';

describe('HistoricoComponent', () => {
  let component: HistoricoComponent;
  let fixture: ComponentFixture<HistoricoComponent>;

  let fakeHistoricoService: HistoricoService;

  const item1: IHistoricoItem = {
    id: 1,
    data: new Date(),
    valorDeEntrada: 10,
    valorDeSaida: 9.179222,
    moedaDeOrigem: 'USD',
    moedaDeDestino: 'BRL',
    taxa: 0.917922,
    valorAlto: true,
  };

  const mockItems: IHistoricoItem[] = [
    {
      id: 1,
      data: new Date(),
      valorDeEntrada: 10001,
      valorDeSaida: 9.179222,
      moedaDeOrigem: 'USD',
      moedaDeDestino: 'BRL',
      taxa: 0.917922,
      valorAlto: true,
    },
    {
      id: 2,
      data: new Date(),
      valorDeEntrada: 10000,
      valorDeSaida: 9.179222,
      moedaDeOrigem: 'USD',
      moedaDeDestino: 'BRL',
      taxa: 0.917922,
      valorAlto: false,
    },
  ];

  beforeEach(async () => {
    fakeHistoricoService = jasmine.createSpyObj<HistoricoService>(
      'ExchangerateService',
      {
        getItems: [...mockItems],
      }
    );

    await TestBed.configureTestingModule({
      declarations: [HistoricoComponent],
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: HistoricoService, useValue: fakeHistoricoService },
      ],
    }).compileComponents();

    fakeHistoricoService.alteracaoHistorico = new Subject<any>();

    fixture = TestBed.createComponent(HistoricoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('deve chamar o metodo getItems após iniciado', () => {
    expect(fakeHistoricoService.getItems).not.toHaveBeenCalled();
    component.ngOnInit();
    expect(fakeHistoricoService.getItems).toHaveBeenCalledTimes(1);
  });

  describe('HTML', () => {
    it('deve renderizar um ícone de valor alto quando o valor do item em dólares for maior que 10000', (done) => {
      fixture.detectChanges();
      const quantidadeEsperada = mockItems.filter(
        (item) => item.valorAlto
      ).length;

      fixture.whenStable().then(() => {
        let icones = fixture.nativeElement.querySelectorAll('.fa-dollar-sign');

        expect(icones.length).toEqual(quantidadeEsperada);

        component.dataSource.data = [mockItems[1]];

        fixture.detectChanges();

        icones = fixture.nativeElement.querySelectorAll('.fa-dollar-sign');

        expect(icones.length).toEqual(0);

        done();
      });
    });

    it('deve ter um número de colunas igual ao número de displayedColumns', (done) => {
      fixture.detectChanges();
      const quantidadeEsperada = component.displayedColumns.length;

      fixture.whenStable().then(() => {
        let colunas = fixture.nativeElement.querySelectorAll('th');

        expect(colunas.length).toEqual(quantidadeEsperada);

        done();
      });
    });

    it('deve renderizar o matNoDataRow quando não houver nenhum item a ser mostrado', (done) => {
      fixture.detectChanges();
      component.dataSource.data = [];
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const noDataRow = fixture.nativeElement.querySelector('tbody tr td');

        expect(noDataRow.innerText).toEqual('Não há items no histórico.');

        done();
      });
    });

    it('deve renderizar o matNoDataRow quando não houver nenhum item a ser mostrado', (done) => {
      fixture.detectChanges();
      component.dataSource.data = [];
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const noDataRow = fixture.nativeElement.querySelector('tbody tr td');

        expect(noDataRow.innerText).toEqual('Não há items no histórico.');

        done();
      });
    });
  });
});
