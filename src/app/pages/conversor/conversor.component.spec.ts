import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoedasFormComponent } from 'src/app/components/moedas-form/moedas-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IHistoricoItem } from 'src/app/interfaces/IHistoricoItem';
import { ConversorComponent } from './conversor.component';
import { ResultadosComponent } from 'src/app/components/resultados/resultados.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
      declarations: [
        ConversorComponent,
        MoedasFormComponent,
        ResultadosComponent,
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
