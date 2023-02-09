import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangerateService } from 'src/app/services/exchangerate.service';
import { MoedasFormComponent } from './moedas-form.component';
import { IConversaoData } from 'src/app/interfaces/IConversaoData';
import { ISimbolosData } from 'src/app/interfaces/ISimbolosData';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

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
        verificarValorEmDolar: undefined,
      }
    );

    await TestBed.configureTestingModule({
      declarations: [MoedasFormComponent],
      providers: [
        { provide: ExchangerateService, useValue: fakeExchangerateService },
      ],
      imports: [
        HttpClientTestingModule,
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatSelectModule,
        MatOptionModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
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
      expect(
        fakeExchangerateService.verificarValorEmDolar
      ).not.toHaveBeenCalled();
    });

    it('deveria chamar o método converterMoeda e o método verificarValorEmDolar quando a moeda de origem não for for USD', () => {
      component.valor = '1';
      component.moedaOrigem = 'EUR';
      component.moedaDestino = 'BRL';

      component.onSubmit();

      expect(fakeExchangerateService.converterMoeda).toHaveBeenCalled();
      expect(fakeExchangerateService.verificarValorEmDolar).toHaveBeenCalled();
    });

    it('não deveria chamar nenhum método caso não tenha uma moeda de origem definida', () => {
      component.valor = '1';

      component.moedaDestino = 'USA';

      expect(fakeExchangerateService.converterMoeda).not.toHaveBeenCalled();
      expect(
        fakeExchangerateService.verificarValorEmDolar
      ).not.toHaveBeenCalled();
    });

    it('não deveria chamar nenhum método caso não tenha uma moeda de destino definida', () => {
      component.valor = '1';

      component.moedaOrigem = 'USA';

      expect(fakeExchangerateService.converterMoeda).not.toHaveBeenCalled();
      expect(
        fakeExchangerateService.verificarValorEmDolar
      ).not.toHaveBeenCalled();
    });

    it('não deveria chamar nenhum método caso não tenha um valor definido', () => {
      component.moedaOrigem = 'USA';
      component.moedaDestino = 'BRL';

      expect(fakeExchangerateService.converterMoeda).not.toHaveBeenCalled();
      expect(
        fakeExchangerateService.verificarValorEmDolar
      ).not.toHaveBeenCalled();
    });

    it('não deveria chamar nenhum método caso valor esteja igual ou abaixo de 0', () => {
      component.moedaOrigem = 'USA';
      component.moedaDestino = 'BRL';
      component.valor = '0';

      expect(fakeExchangerateService.converterMoeda).not.toHaveBeenCalled();
      expect(
        fakeExchangerateService.verificarValorEmDolar
      ).not.toHaveBeenCalled();
    });
  });

  describe('HTML', () => {
    it('deve acionar o botão de conversão somente se todos os atributos necessários forem válidos', () => {
      component.moedaOrigem = 'USA';
      component.moedaDestino = 'BRL';
      component.valor = '1';

      fixture.detectChanges();

      let button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.disabled).toBeFalsy();

      component.moedaOrigem = '';
      fixture.detectChanges();

      button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.disabled).toBeTruthy();
    });

    it('deve desativar o botão de conversão caso o valor seja negativo ou 0', () => {
      component.moedaOrigem = 'USA';
      component.moedaDestino = 'BRL';
      component.valor = '0';

      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button'));

      expect(button.nativeElement.disabled).toBeTruthy();
    });
  });
});
