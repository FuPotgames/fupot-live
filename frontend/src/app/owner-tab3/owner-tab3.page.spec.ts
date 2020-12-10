import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerTab3Page } from './owner-tab3.page';

describe('OwnerTab3Page', () => {
  let component: OwnerTab3Page;
  let fixture: ComponentFixture<OwnerTab3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerTab3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerTab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
