import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusTypeComponent } from './bonus-type.component';

describe('BonusTypeComponent', () => {
  let component: BonusTypeComponent;
  let fixture: ComponentFixture<BonusTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
