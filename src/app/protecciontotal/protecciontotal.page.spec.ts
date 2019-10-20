import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtecciontotalPage } from './protecciontotal.page';

describe('ProtecciontotalPage', () => {
  let component: ProtecciontotalPage;
  let fixture: ComponentFixture<ProtecciontotalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtecciontotalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtecciontotalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
