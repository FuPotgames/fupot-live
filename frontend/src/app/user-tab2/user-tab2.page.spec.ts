import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTab2Page } from './user-tab2.page';

describe('UserTab2Page', () => {
  let component: UserTab2Page;
  let fixture: ComponentFixture<UserTab2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTab2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
