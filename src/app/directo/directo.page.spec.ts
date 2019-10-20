import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoPage } from './directo.page';

describe('DirectoPage', () => {
  let component: DirectoPage;
  let fixture: ComponentFixture<DirectoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
