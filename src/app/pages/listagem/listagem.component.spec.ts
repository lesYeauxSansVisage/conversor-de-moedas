import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemComponent } from './listagem.component';
import { of } from 'rxjs';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ExchangerateService } from 'src/app/services/exchangerate.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ISimbolosData } from 'src/app/interfaces/ISimbolosData';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';

describe('ListagemComponent', () => {
  const moedasResultado: ISimbolosData = {
    motd: 'Sua mensagem',
    sucess: true,
    symbols: {
      USD: { description: 'United States Dollar', code: 'USD' },
      BRL: { description: 'Brazillian Real', code: 'BRL' },
    },
  };

  let component: ListagemComponent;
  let fixture: ComponentFixture<ListagemComponent>;

  let fakeExchangerateService: ExchangerateService;

  beforeEach(async () => {
    fakeExchangerateService = jasmine.createSpyObj<ExchangerateService>(
      'ExchangerateService',
      {
        fetchMoedas: of(moedasResultado),
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ListagemComponent],
      providers: [
        { provide: ExchangerateService, useValue: fakeExchangerateService },
      ],
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deveria chamar o método fetchMoedas depois de iniciado', () => {
    component.ngOnInit();
    expect(fakeExchangerateService.fetchMoedas).toHaveBeenCalled();
  });

  it('deveria ter uma array de moedas depois de chamar o método fetchMoedas', () => {
    expect(component.moedas).toEqual(Object.values(moedasResultado.symbols));
  });

  it('o atributo dataSource deve ter sido inicializado', () => {
    expect(component.dataSource).toBeTruthy();
  });
});
