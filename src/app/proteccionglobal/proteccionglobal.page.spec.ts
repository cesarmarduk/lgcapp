import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteccionglobalPage } from './proteccionglobal.page';

describe('ProteccionglobalPage', () => {
  let component: ProteccionglobalPage;
  let fixture: ComponentFixture<ProteccionglobalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProteccionglobalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProteccionglobalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
