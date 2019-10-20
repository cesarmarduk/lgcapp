import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditohipotecarioPage } from './creditohipotecario.page';

describe('CreditohipotecarioPage', () => {
  let component: CreditohipotecarioPage;
  let fixture: ComponentFixture<CreditohipotecarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditohipotecarioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditohipotecarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
