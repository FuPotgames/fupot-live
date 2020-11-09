import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerScheduledgamesPage } from './owner-scheduledgames.page';

describe('OwnerScheduledgamesPage', () => {
  let component: OwnerScheduledgamesPage;
  let fixture: ComponentFixture<OwnerScheduledgamesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerScheduledgamesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerScheduledgamesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
