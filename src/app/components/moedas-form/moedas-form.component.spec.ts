import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoedasFormComponent } from './moedas-form.component';

describe('MoedasFormComponent', () => {
  let component: MoedasFormComponent;
  let fixture: ComponentFixture<MoedasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoedasFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoedasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
