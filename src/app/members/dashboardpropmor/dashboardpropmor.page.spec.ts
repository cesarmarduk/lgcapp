import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardpropmorPage } from './dashboardpropmor.page';

describe('DashboardpropmorPage', () => {
  let component: DashboardpropmorPage;
  let fixture: ComponentFixture<DashboardpropmorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardpropmorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardpropmorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
