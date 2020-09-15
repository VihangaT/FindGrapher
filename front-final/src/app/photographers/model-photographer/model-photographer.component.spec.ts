import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPhotographerComponent } from './model-photographer.component';

describe('ModelPhotographerComponent', () => {
  let component: ModelPhotographerComponent;
  let fixture: ComponentFixture<ModelPhotographerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelPhotographerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPhotographerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
