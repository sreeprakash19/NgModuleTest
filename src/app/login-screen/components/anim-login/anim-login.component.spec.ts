import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimLoginComponent } from './anim-login.component';

describe('AnimLoginComponent', () => {
  let component: AnimLoginComponent;
  let fixture: ComponentFixture<AnimLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
