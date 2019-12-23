import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolizaPage } from './poliza.page';

describe('PolizaPage', () => {
  let component: PolizaPage;
  let fixture: ComponentFixture<PolizaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolizaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolizaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
