import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyrightSmallComponent } from './copyright-small.component';

describe('CopyrightSmallComponent', () => {
  let component: CopyrightSmallComponent;
  let fixture: ComponentFixture<CopyrightSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyrightSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyrightSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
