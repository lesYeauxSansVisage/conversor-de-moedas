import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ExchangerateService } from './exchangerate.service';

import { ISimbolosData } from '../interfaces/ISimbolosData';
import { IConversaoData } from '../interfaces/IConversaoData';

describe('ExchangerateService', () => {
  let service: ExchangerateService;
  let httpMock: HttpTestingController;

  const mockRespostaConversao: IConversaoData = {
    query: { from: 'USA', to: 'BRL', amount: 10 },
    info: { rate: 5.574488 },
    date: '2023-02-10',
    result: 55.744882,
  };

  const mockRespostaSimbolos: ISimbolosData = {
    motd: 'Aqui está sua resposta',
    sucess: true,
    symbols: {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExchangerateService],
    });
    service = TestBed.inject(ExchangerateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('fetchMoedas', () => {
    it('deve retornar informações sobre as moedas disponíveis', () => {
      service.fetchMoedas().subscribe((data) => {
        expect(data).toEqual(mockRespostaSimbolos);
      });

      const request = httpMock.expectOne(service.symbolsURL);
      expect(request.request.method).toBe('GET');

      request.flush(mockRespostaSimbolos);
    });
  });

  describe('converterMoeda', () => {
    it('deve retornar informações sobre a conversão feita', () => {
      service.converterMoeda('USD', 'BRL', 10).subscribe((data) => {
        expect(data).toEqual(mockRespostaConversao);
      });

      const request = httpMock.expectOne(
        'https://api.exchangerate.host/convert?from=USD&to=BRL&amount=10'
      );

      expect(request.request.method).toBe('GET');

      request.flush(mockRespostaConversao);
    });
  });
});
