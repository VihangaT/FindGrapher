import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdPhotographerComponent } from './prod-photographer.component';

describe('ProdPhotographerComponent', () => {
  let component: ProdPhotographerComponent;
  let fixture: ComponentFixture<ProdPhotographerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdPhotographerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdPhotographerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
