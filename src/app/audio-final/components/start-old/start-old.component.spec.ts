import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartOldComponent } from './start-old.component';

describe('StartOldComponent', () => {
  let component: StartOldComponent;
  let fixture: ComponentFixture<StartOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartOldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
