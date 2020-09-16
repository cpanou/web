import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualListComponent } from './actual-list.component';

describe('ActualListComponent', () => {
  let component: ActualListComponent;
  let fixture: ComponentFixture<ActualListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
