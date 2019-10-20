import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcularproteccionPage } from './calcularproteccion.page';

describe('CalcularproteccionPage', () => {
  let component: CalcularproteccionPage;
  let fixture: ComponentFixture<CalcularproteccionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcularproteccionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcularproteccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
