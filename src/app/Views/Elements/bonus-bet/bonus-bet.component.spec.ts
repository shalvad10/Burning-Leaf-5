import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusBetComponent } from './bonus-bet.component';

describe('BonusBetComponent', () => {
  let component: BonusBetComponent;
  let fixture: ComponentFixture<BonusBetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusBetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
