import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarExclusaoComponent } from './confirmar-exclusao.component';

import { MatDialogModule } from '@angular/material/dialog';

describe('ConfirmarExclusaoComponent', () => {
  let component: ConfirmarExclusaoComponent;
  let fixture: ComponentFixture<ConfirmarExclusaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmarExclusaoComponent],
      imports: [MatDialogModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmarExclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
