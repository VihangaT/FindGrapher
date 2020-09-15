import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionPhotographerComponent } from './fashion-photographer.component';

describe('FashionPhotographerComponent', () => {
  let component: FashionPhotographerComponent;
  let fixture: ComponentFixture<FashionPhotographerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FashionPhotographerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FashionPhotographerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
