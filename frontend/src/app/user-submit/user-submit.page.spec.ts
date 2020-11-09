import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubmitPage } from './user-submit.page';

describe('UserSubmitPage', () => {
  let component: UserSubmitPage;
  let fixture: ComponentFixture<UserSubmitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSubmitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSubmitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
