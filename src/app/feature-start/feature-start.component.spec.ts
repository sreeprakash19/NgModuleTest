import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureStartComponent } from './feature-start.component';

describe('FeatureStartComponent', () => {
  let component: FeatureStartComponent;
  let fixture: ComponentFixture<FeatureStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
