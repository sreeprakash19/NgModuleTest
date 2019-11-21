import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeInitialComponent } from './anime-initial.component';

describe('AnimeInitialComponent', () => {
  let component: AnimeInitialComponent;
  let fixture: ComponentFixture<AnimeInitialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimeInitialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeInitialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
