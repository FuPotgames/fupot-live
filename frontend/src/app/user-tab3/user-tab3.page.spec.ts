import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTab3Page } from './user-tab3.page';

describe('UserTab3Page', () => {
  let component: UserTab3Page;
  let fixture: ComponentFixture<UserTab3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTab3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
