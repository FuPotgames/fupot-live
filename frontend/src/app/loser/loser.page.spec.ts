import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoserPage } from './loser.page';

describe('LoserPage', () => {
  let component: LoserPage;
  let fixture: ComponentFixture<LoserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
