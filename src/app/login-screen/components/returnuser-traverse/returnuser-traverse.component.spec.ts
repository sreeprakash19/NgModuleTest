import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnuserTraverseComponent } from './returnuser-traverse.component';

describe('ReturnuserTraverseComponent', () => {
  let component: ReturnuserTraverseComponent;
  let fixture: ComponentFixture<ReturnuserTraverseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnuserTraverseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnuserTraverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
