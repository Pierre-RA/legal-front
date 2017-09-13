import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSimpleDisplayComponent } from './loan-simple-display.component';

describe('LoanSimpleDisplayComponent', () => {
  let component: LoanSimpleDisplayComponent;
  let fixture: ComponentFixture<LoanSimpleDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanSimpleDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanSimpleDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
