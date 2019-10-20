import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcularcreditoPage } from './calcularcredito.page';

describe('CalcularcreditoPage', () => {
  let component: CalcularcreditoPage;
  let fixture: ComponentFixture<CalcularcreditoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcularcreditoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcularcreditoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
