import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerLightComponent } from './server-light.component';

describe('ServerLightComponent', () => {
  let component: ServerLightComponent;
  let fixture: ComponentFixture<ServerLightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerLightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
