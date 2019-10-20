import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarcontratoPage } from './solicitarcontrato.page';

describe('SolicitarcontratoPage', () => {
  let component: SolicitarcontratoPage;
  let fixture: ComponentFixture<SolicitarcontratoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitarcontratoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarcontratoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
