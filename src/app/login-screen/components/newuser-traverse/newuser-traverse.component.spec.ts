import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewuserTraverseComponent } from './newuser-traverse.component';

describe('NewuserTraverseComponent', () => {
  let component: NewuserTraverseComponent;
  let fixture: ComponentFixture<NewuserTraverseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewuserTraverseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewuserTraverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
