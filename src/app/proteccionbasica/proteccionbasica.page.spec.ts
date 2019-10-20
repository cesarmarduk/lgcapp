import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteccionbasicaPage } from './proteccionbasica.page';

describe('ProteccionbasicaPage', () => {
  let component: ProteccionbasicaPage;
  let fixture: ComponentFixture<ProteccionbasicaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProteccionbasicaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProteccionbasicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
