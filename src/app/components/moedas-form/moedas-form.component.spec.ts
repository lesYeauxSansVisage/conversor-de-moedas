import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangerateService } from 'src/app/services/exchangerate.service';
import { MoedasFormComponent } from './moedas-form.component';
import { IConversaoData } from 'src/app/interfaces/IConversaoData';
import { ISimbolosData } from 'src/app/interfaces/ISimbolosData';

import { of } from 'rxjs';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MoedasFormComponent', () => {
  let component: MoedasFormComponent;
  let fixture: ComponentFixture<MoedasFormComponent>;

  let fakeExchangerateService: ExchangerateService;

  const dataConversao: IConversaoData = {
    query: {
      from: 'USD',
      to: 'BRL',
      amount: 10,
    },
    result: 9.179222,
    date: '2023-02-03',
    info: {
      rate: 0.917922,
    },
  };

  const moedasResultado: ISimbolosData = {
    motd: 'Sua mensagem',
    sucess: true,
    symbols: {
      USD: { description: 'United States Dollar', code: 'USD' },
      BRL: { description: 'Brazillian Real', code: 'BRL' },
    },
  };

  beforeEach(async () => {
    fakeExchangerateService = jasmine.createSpyObj<ExchangerateService>(
      'ExchangerateService',
      {
        fetchMoedas: of(moedasResultado),
        converterMoeda: of(dataConversao),
        verificarValorAlto: undefined,
      }
    );

    await TestBed.configureTestingModule({
      declarations: [MoedasFormComponent],
      providers: [
        { provide: ExchangerateService, useValue: fakeExchangerateService },
      ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MoedasFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deveria chamar o método fetch moedas quando iniciado', () => {
    expect(fakeExchangerateService.fetchMoedas).not.toHaveBeenCalled();

    component.ngOnInit();

    expect(fakeExchangerateService.fetchMoedas).toHaveBeenCalledTimes(1);
  });

  describe('onSubmit', () => {
    it('deveria chamar somente o método converterMoeda quando a moeda de origem for USD', () => {
      component.valor = '1';
      component.moedaOrigem = 'USD';
      component.moedaDestino = 'BRL';

      component.onSubmit();

      expect(fakeExchangerateService.converterMoeda).toHaveBeenCalled();
      expect(fakeExchangerateService.verificarValorAlto).not.toHaveBeenCalled();
    });

    it('deveria chamar somente o método converterMoeda e o método verficarValorAlto quando a moeda de origem não for for USD', () => {
      component.valor = '1';
      component.moedaOrigem = 'EUR';
      component.moedaDestino = 'BRL';

      component.onSubmit();

      expect(fakeExchangerateService.converterMoeda).toHaveBeenCalled();
      expect(fakeExchangerateService.verificarValorAlto).toHaveBeenCalled();
    });
  });
});
