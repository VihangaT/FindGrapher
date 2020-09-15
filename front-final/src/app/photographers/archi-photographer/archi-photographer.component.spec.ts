import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiPhotographerComponent } from './archi-photographer.component';

describe('ArchiPhotographerComponent', () => {
  let component: ArchiPhotographerComponent;
  let fixture: ComponentFixture<ArchiPhotographerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiPhotographerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiPhotographerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
