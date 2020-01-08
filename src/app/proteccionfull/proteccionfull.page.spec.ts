import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteccionfullPage } from './proteccionfull.page';

describe('ProteccionfullPage', () => {
  let component: ProteccionfullPage;
  let fixture: ComponentFixture<ProteccionfullPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProteccionfullPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProteccionfullPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
