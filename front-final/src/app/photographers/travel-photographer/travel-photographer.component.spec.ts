import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPhotographerComponent } from './travel-photographer.component';

describe('TravelPhotographerComponent', () => {
  let component: TravelPhotographerComponent;
  let fixture: ComponentFixture<TravelPhotographerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelPhotographerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelPhotographerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
