import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusWinComponent } from './bonus-win.component';

describe('BonusWinComponent', () => {
  let component: BonusWinComponent;
  let fixture: ComponentFixture<BonusWinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusWinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
