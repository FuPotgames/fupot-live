import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerTab2Page } from './owner-tab2.page';

describe('OwnerTab2Page', () => {
  let component: OwnerTab2Page;
  let fixture: ComponentFixture<OwnerTab2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerTab2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerTab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
