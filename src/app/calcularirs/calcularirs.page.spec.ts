import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcularirsPage } from './calcularirs.page';

describe('CalcularirsPage', () => {
  let component: CalcularirsPage;
  let fixture: ComponentFixture<CalcularirsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcularirsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcularirsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
