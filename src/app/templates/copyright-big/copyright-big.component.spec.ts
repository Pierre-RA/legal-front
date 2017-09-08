import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyrightBigComponent } from './copyright-big.component';

describe('CopyrightBigComponent', () => {
  let component: CopyrightBigComponent;
  let fixture: ComponentFixture<CopyrightBigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyrightBigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyrightBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
