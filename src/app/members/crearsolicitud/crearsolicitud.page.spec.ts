import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearsolicitudPage } from './crearsolicitud.page';

describe('CrearsolicitudPage', () => {
  let component: CrearsolicitudPage;
  let fixture: ComponentFixture<CrearsolicitudPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearsolicitudPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearsolicitudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
