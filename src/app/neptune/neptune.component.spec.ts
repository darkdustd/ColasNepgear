import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeptuneComponent } from './neptune.component';

describe('NeptuneComponent', () => {
  let component: NeptuneComponent;
  let fixture: ComponentFixture<NeptuneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeptuneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeptuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
