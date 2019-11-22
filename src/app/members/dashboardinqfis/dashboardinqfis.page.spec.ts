import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardinqfisPage } from './dashboardinqfis.page';

describe('DashboardinqfisPage', () => {
  let component: DashboardinqfisPage;
  let fixture: ComponentFixture<DashboardinqfisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardinqfisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardinqfisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
