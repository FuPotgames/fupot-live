import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLocationPage } from './user-location.page';

describe('UserLocationPage', () => {
  let component: UserLocationPage;
  let fixture: ComponentFixture<UserLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLocationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
