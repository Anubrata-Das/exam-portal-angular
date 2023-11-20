import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuizAnswersComponent } from './view-quiz-answers.component';

describe('ViewQuizAnswersComponent', () => {
  let component: ViewQuizAnswersComponent;
  let fixture: ComponentFixture<ViewQuizAnswersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewQuizAnswersComponent]
    });
    fixture = TestBed.createComponent(ViewQuizAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
