import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTab1Page } from './user-tab1.page';

describe('UserTab1Page', () => {
  let component: UserTab1Page;
  let fixture: ComponentFixture<UserTab1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTab1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
