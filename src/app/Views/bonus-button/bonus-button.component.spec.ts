import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusButtonComponent } from './bonus-button.component';

describe('BonusButtonComponent', () => {
  let component: BonusButtonComponent;
  let fixture: ComponentFixture<BonusButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
