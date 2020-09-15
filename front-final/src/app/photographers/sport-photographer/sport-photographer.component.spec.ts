import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportPhotographerComponent } from './sport-photographer.component';

describe('SportPhotographerComponent', () => {
  let component: SportPhotographerComponent;
  let fixture: ComponentFixture<SportPhotographerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportPhotographerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportPhotographerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
