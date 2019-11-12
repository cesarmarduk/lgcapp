import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearincumplimientoPage } from './crearincumplimiento.page';

describe('CrearincumplimientoPage', () => {
  let component: CrearincumplimientoPage;
  let fixture: ComponentFixture<CrearincumplimientoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearincumplimientoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearincumplimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
