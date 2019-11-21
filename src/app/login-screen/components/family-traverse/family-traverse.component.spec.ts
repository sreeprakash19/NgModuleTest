import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyTraverseComponent } from './family-traverse.component';

describe('FamilyTraverseComponent', () => {
  let component: FamilyTraverseComponent;
  let fixture: ComponentFixture<FamilyTraverseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyTraverseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyTraverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
