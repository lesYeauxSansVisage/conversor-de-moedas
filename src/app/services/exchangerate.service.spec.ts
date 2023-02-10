import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ExchangerateService } from './exchangerate.service';
import { ISimbolosData } from '../interfaces/ISimbolosData';
import { IConversaoData } from '../interfaces/IConversaoData';

describe('ExchangerateService', () => {
  let service: ExchangerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExchangerateService],
    });
    service = TestBed.inject(ExchangerateService);
  });

  describe('fetchMoedas', () => {
    it('deveria retornar uma resposta com um objeto com todas as moedas disponíveis', () => {
      const resposta: ISimbolosData = {
        motd: 'Aqui está sua resposta',
        sucess: true,
        symbols: {},
      };

      let response: ISimbolosData;

      spyOn(service, 'fetchMoedas').and.returnValue(of(resposta));

      service.fetchMoedas().subscribe((res: ISimbolosData) => {
        response = res;

        expect(response).toEqual(resposta);
      });
    });
  });

  describe('converterMoeda', () => {
    it('deveria retornar um objeto contendo dados da conversão', () => {
      const resposta: IConversaoData = {
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

      let response: IConversaoData;

      spyOn(service, 'converterMoeda').and.returnValue(of(resposta));

      service
        .converterMoeda('USD', 'BRL', 10)
        .subscribe((res: IConversaoData) => {
          response = res;

          expect(response).toEqual(resposta);
        });
    });
  });
});
