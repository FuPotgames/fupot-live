import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerTab1Page } from './owner-tab1.page';

describe('OwnerTab1Page', () => {
  let component: OwnerTab1Page;
  let fixture: ComponentFixture<OwnerTab1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerTab1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerTab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
