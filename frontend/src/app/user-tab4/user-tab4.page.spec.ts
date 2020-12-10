import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTab4Page } from './user-tab4.page';

describe('UserTab4Page', () => {
  let component: UserTab4Page;
  let fixture: ComponentFixture<UserTab4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTab4Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTab4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
