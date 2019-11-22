import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardpropfisPage } from './dashboardpropfis.page';

describe('DashboardpropfisPage', () => {
  let component: DashboardpropfisPage;
  let fixture: ComponentFixture<DashboardpropfisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardpropfisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardpropfisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
