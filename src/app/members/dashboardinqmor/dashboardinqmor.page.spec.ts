import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardinqmorPage } from './dashboardinqmor.page';

describe('DashboardinqmorPage', () => {
  let component: DashboardinqmorPage;
  let fixture: ComponentFixture<DashboardinqmorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardinqmorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardinqmorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
