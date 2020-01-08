import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncumplimientosPage } from './incumplimientos.page';

describe('IncumplimientosPage', () => {
  let component: IncumplimientosPage;
  let fixture: ComponentFixture<IncumplimientosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncumplimientosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncumplimientosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
