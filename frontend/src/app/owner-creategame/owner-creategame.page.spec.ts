import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerCreategamePage } from './owner-creategame.page';

describe('OwnerCreategamePage', () => {
  let component: OwnerCreategamePage;
  let fixture: ComponentFixture<OwnerCreategamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerCreategamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerCreategamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
