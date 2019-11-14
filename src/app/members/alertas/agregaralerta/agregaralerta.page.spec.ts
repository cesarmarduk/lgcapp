import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaralertaPage } from './agregaralerta.page';

describe('AgregaralertaPage', () => {
  let component: AgregaralertaPage;
  let fixture: ComponentFixture<AgregaralertaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregaralertaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaralertaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
