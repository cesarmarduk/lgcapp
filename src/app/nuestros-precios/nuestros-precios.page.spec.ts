import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestrosPreciosPage } from './nuestros-precios.page';

describe('NuestrosPreciosPage', () => {
  let component: NuestrosPreciosPage;
  let fixture: ComponentFixture<NuestrosPreciosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuestrosPreciosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuestrosPreciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
