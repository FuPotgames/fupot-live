import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestApiPage } from './test-api.page';

describe('TestApiPage', () => {
  let component: TestApiPage;
  let fixture: ComponentFixture<TestApiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestApiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestApiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
