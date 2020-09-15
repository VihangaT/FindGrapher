import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographerRegisterComponent } from './photographer-register.component';

describe('PhotographerRegisterComponent', () => {
  let component: PhotographerRegisterComponent;
  let fixture: ComponentFixture<PhotographerRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographerRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
