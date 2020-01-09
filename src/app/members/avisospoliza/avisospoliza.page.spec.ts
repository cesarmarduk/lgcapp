import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisospolizaPage } from './avisospoliza.page';

describe('AvisospolizaPage', () => {
  let component: AvisospolizaPage;
  let fixture: ComponentFixture<AvisospolizaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisospolizaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisospolizaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
