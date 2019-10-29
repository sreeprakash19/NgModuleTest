import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlArrayComponent } from './form-control-array.component';

describe('FormControlArrayComponent', () => {
  let component: FormControlArrayComponent;
  let fixture: ComponentFixture<FormControlArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
