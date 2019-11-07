import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseUnionComponent } from './firebase-union.component';

describe('FirebaseUnionComponent', () => {
  let component: FirebaseUnionComponent;
  let fixture: ComponentFixture<FirebaseUnionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirebaseUnionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseUnionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
