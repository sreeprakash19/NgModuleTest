import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartNullComponent } from './start-null.component';

describe('StartNullComponent', () => {
  let component: StartNullComponent;
  let fixture: ComponentFixture<StartNullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartNullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartNullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
