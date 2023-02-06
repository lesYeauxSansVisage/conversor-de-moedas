import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IHistoricoItem } from 'src/app/interfaces/IHistoricoItem';

import { ResultadosComponent } from './resultados.component';

describe('ResultadosComponent', () => {
  let component: ResultadosComponent;
  let fixture: ComponentFixture<ResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultadosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultadosComponent);
    component = fixture.componentInstance;

    const item: IHistoricoItem = {
      id: 1,
      data: new Date(),
      valorDeEntrada: 10,
      valorDeSaida: 10,
      moedaDeOrigem: 'USD',
      moedaDeDestino: 'BRL',
      taxa: 100,
      valorAlto: true,
    };

    component.conversaoAtual = item;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
