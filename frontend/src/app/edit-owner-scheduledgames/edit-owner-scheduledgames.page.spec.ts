import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOwnerScheduledgamesPage } from './edit-owner-scheduledgames.page';

describe('EditOwnerScheduledgamesPage', () => {
  let component: EditOwnerScheduledgamesPage;
  let fixture: ComponentFixture<EditOwnerScheduledgamesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOwnerScheduledgamesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOwnerScheduledgamesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
