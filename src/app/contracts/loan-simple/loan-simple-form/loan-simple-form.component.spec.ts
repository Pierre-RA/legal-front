import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSimpleFormComponent } from './loan-simple-form.component';

describe('LoanSimpleFormComponent', () => {
  let component: LoanSimpleFormComponent;
  let fixture: ComponentFixture<LoanSimpleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanSimpleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanSimpleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
