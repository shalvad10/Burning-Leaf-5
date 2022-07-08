import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinButtonsComponent } from './spin-buttons.component';

describe('SpinButtonsComponent', () => {
  let component: SpinButtonsComponent;
  let fixture: ComponentFixture<SpinButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
