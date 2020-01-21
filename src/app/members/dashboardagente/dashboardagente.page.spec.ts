import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardagentePage } from './dashboardagente.page';

describe('DashboardagentePage', () => {
  let component: DashboardagentePage;
  let fixture: ComponentFixture<DashboardagentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardagentePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardagentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
