import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongratsPage } from './congrats.page';

describe('CongratsPage', () => {
  let component: CongratsPage;
  let fixture: ComponentFixture<CongratsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongratsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongratsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
