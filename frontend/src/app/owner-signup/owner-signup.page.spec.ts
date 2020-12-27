import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerSignupPage } from './owner-signup.page';

describe('OwnerSignupPage', () => {
  let component: OwnerSignupPage;
  let fixture: ComponentFixture<OwnerSignupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerSignupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerSignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
