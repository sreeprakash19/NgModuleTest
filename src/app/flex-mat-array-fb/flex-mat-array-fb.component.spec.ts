import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexMatArrayFBComponent } from './flex-mat-array-fb.component';

describe('FlexMatArrayFBComponent', () => {
  let component: FlexMatArrayFBComponent;
  let fixture: ComponentFixture<FlexMatArrayFBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexMatArrayFBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexMatArrayFBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
