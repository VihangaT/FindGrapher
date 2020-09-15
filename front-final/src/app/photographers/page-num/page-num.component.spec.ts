import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNumComponent } from './page-num.component';

describe('PageNumComponent', () => {
  let component: PageNumComponent;
  let fixture: ComponentFixture<PageNumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
