import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerMembersPage } from './owner-members.page';

describe('OwnerMembersPage', () => {
  let component: OwnerMembersPage;
  let fixture: ComponentFixture<OwnerMembersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerMembersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerMembersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
