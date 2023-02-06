import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoedasFormComponent } from 'src/app/components/moedas-form/moedas-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IHistoricoItem } from 'src/app/interfaces/IHistoricoItem';
import { ConversorComponent } from './conversor.component';

describe('ConversorComponent', () => {
  let component: ConversorComponent;
  let fixture: ComponentFixture<ConversorComponent>;

  const item1: IHistoricoItem = {
    id: 1,
    data: new Date(),
    valorDeEntrada: 10,
    valorDeSaida: 9.179222,
    moedaDeOrigem: 'USD',
    moedaDeDestino: 'BRL',
    taxa: 0.917922,
    valorAlto: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConversorComponent, MoedasFormComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ConversorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve mudar o atributo conversaoAtual quando o método atualizarConversao for acionado', () => {
    component.atualizarConversaoAtual(item1);
    expect(component.conversaoAtual).toEqual(item1);
  });
});
