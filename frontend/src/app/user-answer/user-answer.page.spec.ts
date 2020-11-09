import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnswerPage } from './user-answer.page';

describe('UserAnswerPage', () => {
  let component: UserAnswerPage;
  let fixture: ComponentFixture<UserAnswerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAnswerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAnswerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
