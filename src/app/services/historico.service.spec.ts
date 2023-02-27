import { TestBed } from '@angular/core/testing';

import { IHistoricoItem } from '../interfaces/IHistoricoItem';
import { HistoricoService } from './historico.service';
import { IConversaoData } from '../interfaces/IConversaoData';

describe('HistoricoService', () => {
  let service: HistoricoService;

  const data = new Date();

  const item1: IHistoricoItem = {
    id: 1,
    data: data,
    valorDeEntrada: 10,
    valorDeSaida: 9.179222,
    moedaDeOrigem: 'USD',
    moedaDeDestino: 'BRL',
    taxa: 0.917922,
    valorAlto: false,
  };

  const item2: IHistoricoItem = {
    id: 2,
    data: data,
    valorDeEntrada: 10,
    valorDeSaida: 9.179222,
    moedaDeOrigem: 'USD',
    moedaDeDestino: 'BRL',
    taxa: 0.917922,
    valorAlto: false,
  };

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

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [HistoricoService],
    });
    service = TestBed.inject(HistoricoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('adicionarItem', () => {
    it('deve adicionar um item ao array de items do histórico', () => {
      service.adicionarItem(item1);

      expect(service.getItems().length).toEqual(1);
    });
  });

  describe('excluirItem', () => {
    it('deve excluir um item no array de items do histórico', () => {
      service.adicionarItem(item1);

      service.excluirItem(item1.id!);

      expect(service.getItems().length).toEqual(0);
    });

    it('deve remover o item com o id equivalente ao passado como parametro da array', () => {
      service.adicionarItem(item1);
      service.adicionarItem(item2);

      service.excluirItem(item1.id!);

      expect(
        service.getItems().find((item) => item.id === item1.id)
      ).toBeFalsy();
    });
  });

  describe('formatarDados', () => {
    it('deve retornar um item do histórico com o atributo valorAlto sendo false, caso o valor inserido seja menor ou igual a 10000', () => {
      const item = service.formatarDados(dataConversao, 10000);

      expect(item.valorAlto).toBeFalse();
    });

    it('deve retornar um item do histórico com o atributo valorAlto sendo true, caso o valor inserido seja maior que 10000', () => {
      const item = service.formatarDados(dataConversao, 10001);

      expect(item.valorAlto).toBeTrue();
    });

    it('deve retornar um item com o atributo id igual a 1, caso a array de items esteja vazia', () => {
      const item = service.formatarDados(dataConversao, 10001);

      expect(item.id).toEqual(1);
    });

    it('deve retornar um id igual ao id do ultimo número da array de items +1, caso a array contenha items', () => {
      service.adicionarItem(item2);
      const item = service.formatarDados(dataConversao, 10001);

      expect(item.id).toEqual(3);
    });
  });
});
