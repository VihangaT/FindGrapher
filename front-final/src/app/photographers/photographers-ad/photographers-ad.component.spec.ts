import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographersAdComponent } from './photographers-ad.component';

describe('PhotographersAdComponent', () => {
  let component: PhotographersAdComponent;
  let fixture: ComponentFixture<PhotographersAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographersAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographersAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
