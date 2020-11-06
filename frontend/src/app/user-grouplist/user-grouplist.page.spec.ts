import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGrouplistPage } from './user-grouplist.page';

describe('UserGrouplistPage', () => {
  let component: UserGrouplistPage;
  let fixture: ComponentFixture<UserGrouplistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGrouplistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGrouplistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
