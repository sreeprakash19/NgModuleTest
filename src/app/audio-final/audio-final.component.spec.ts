import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioFinalComponent } from './audio-final.component';

describe('AudioFinalComponent', () => {
  let component: AudioFinalComponent;
  let fixture: ComponentFixture<AudioFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
