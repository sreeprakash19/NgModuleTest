import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayPushComponent } from './array-push.component';

describe('ArrayPushComponent', () => {
  let component: ArrayPushComponent;
  let fixture: ComponentFixture<ArrayPushComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrayPushComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayPushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
