import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPage } from './pagina.page';

describe('PaginaPage', () => {
  let component: PaginaPage;
  let fixture: ComponentFixture<PaginaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
